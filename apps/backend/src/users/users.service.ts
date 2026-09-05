import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as crypto from 'crypto';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${derivedKey}`;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      }
    });
    return { data: users };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      }
    });
    if (!user) throw new NotFoundException('User not found');
    return { data: user };
  }

  async createUser(data: any) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new BadRequestException('Email already in use');

    const user = await this.prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: this.hashPassword(data.password),
        role: data.role || 'KARYAWAN',
        isActive: data.isActive ?? true,
      },
      select: { id: true, name: true, email: true, role: true, isActive: true }
    });
    return { data: user };
  }

  async updateUser(id: string, data: any) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        isActive: data.isActive,
      },
      select: { id: true, name: true, email: true, role: true, isActive: true }
    });
    return { data: user };
  }

  async resetPassword(id: string, newPassword: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        password: this.hashPassword(newPassword),
      }
    });
    return { data: null };
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { data: null };
  }
}

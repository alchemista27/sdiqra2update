import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private verifyPassword(password: string, storedHash: string): boolean {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
    return key === derivedKey;
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive || !user.password) {
      throw new UnauthorizedException('Kredensial tidak valid');
    }
    
    const isMatch = this.verifyPassword(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Kredensial tidak valid');
    }

    // Generate session token
    const token = crypto.randomBytes(48).toString('base64url');
    // Expires in 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt
      }
    });

    const { password, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async validateSession(token: string) {
    const session = await this.prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });
    if (!session || session.expiresAt < new Date() || !session.user.isActive) {
      return null;
    }
    return session.user;
  }
}

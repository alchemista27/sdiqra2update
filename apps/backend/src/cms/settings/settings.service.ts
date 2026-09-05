import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.siteSetting.findMany();
  }

  async getByKey(key: string) {
    const setting = await this.prisma.siteSetting.findUnique({ where: { key } });
    return setting ? setting.value : null;
  }

  async upsert(key: string, value: string) {
    return this.prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}

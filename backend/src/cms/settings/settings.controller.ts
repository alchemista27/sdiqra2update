import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';
import { RolesGuard } from '../../auth/roles.guard.js';
import { Roles } from '../../auth/roles.decorator.js';

@Controller('api/cms/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async findAll() {
    // Array of { key, value }
    const settings = await this.settingsService.findAll();
    // Convert to key-value object for easier consumption on frontend
    const data = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
    return { data };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Post()
  async updateMultiple(@Body() body: Record<string, string>) {
    // Expecting body as { siteName: "SD IT Iqra 2", contactEmail: "..." }
    for (const [key, value] of Object.entries(body)) {
      await this.settingsService.upsert(key, value);
    }
    return { success: true };
  }
}

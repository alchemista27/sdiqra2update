import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service.js';

@Controller('api/cms/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async findAll() {
    const data = await this.settingsService.findAll();
    return { data };
  }
}

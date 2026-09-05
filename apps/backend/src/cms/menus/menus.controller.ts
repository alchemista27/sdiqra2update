import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service.js';
import { SessionAuthGuard } from '../../auth/session-auth.guard.js';
import { RolesGuard } from '../../auth/roles.guard.js';
import { Roles } from '../../auth/roles.decorator.js';

@Controller('api/cms/menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async findAll() {
    const data = await this.menusService.findAll();
    return { data };
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Post()
  async create(@Body() body: any) {
    const data = await this.menusService.create(body);
    return { data };
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const data = await this.menusService.update(id, body);
    return { data };
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.menusService.remove(id);
    return { success: true };
  }
}

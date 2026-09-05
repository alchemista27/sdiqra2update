import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SessionAuthGuard } from './session-auth.guard.js';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const data = await this.authService.login(body.email, body.password);
    return { data };
  }

  @UseGuards(SessionAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    const data = await this.authService.getMe(req.user.id);
    return { data };
  }
}

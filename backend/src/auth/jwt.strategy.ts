import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URI || 'https://example.com/.well-known/jwks.json',
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      // issuer: process.env.JWT_ISSUER, // opsional
    });
  }

  async validate(payload: any) {
    // payload.sub biasanya berisi ID user dari provider (Auth0/Clerk)
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }
    
    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { constants } from '../auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: constants.jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['token'];

          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  async validate(payload: any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

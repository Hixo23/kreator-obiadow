import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'src/types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as RequestUser;
  },
);

import { Reflector } from '@nestjs/core';

export const RequiredPermissions = Reflector.createDecorator<string[]>();

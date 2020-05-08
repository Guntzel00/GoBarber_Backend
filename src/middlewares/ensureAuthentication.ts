import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const headerAuth = request.headers.authorization;

  if (!headerAuth) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = headerAuth.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret_key);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}

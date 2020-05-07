import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';

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
    throw Error('JWT token is missing');
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
    throw new Error('Invalid JWT Token');
  }
}

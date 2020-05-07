import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/user';
import auth from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Email or password incorrect');
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw Error('Email or password incorrect');
    }

    const { secret_key, expiresIn } = auth.jwt;

    const token = sign({}, secret_key, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

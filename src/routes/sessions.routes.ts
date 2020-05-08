import { Router } from 'express';

import AuthenticateUserService from '../Services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const athenticateUser = new AuthenticateUserService();

  const { user, token } = await athenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;

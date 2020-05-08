import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '../middlewares/ensureAuthentication';
import CreateUserService from '../Services/CreateUserService';
import UpdateUserAvatarService from '../Services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      delete user.password;
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;

import { Router } from 'express';
import multer from 'multer';

import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';

import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const user_id = request.user.id;

  const usersRepository = getRepository(User);

  const user = await usersRepository.findOne({ where: { id: user_id } });

  if (!user) {
    return response.json('No user found with this ID');
  }

  delete user.password;

  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createuser = new CreateUserService();

  const user = await createuser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { name } = request.body;
  const { id } = request.params;

  const updateuser = new UpdateUserService();

  const user = await updateuser.execute({
    id,
    name,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const user_id = request.user.id;

  const deleteuser = new DeleteUserService();

  await deleteuser.execute({
    id,
    user_id,
  });

  return response.status(204).send();
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json({ user });
  },
);

export default usersRouter;

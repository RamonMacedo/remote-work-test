import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users';

interface Request {
  id: string;
  user_id: string | undefined;
}

class DeleteUserService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { id },
    });

    if (!checkUserExists) {
      throw new AppError('No user found with this ID', 400);
    }

    if (id !== user_id) {
      throw new AppError('Operation not permitted.', 401);
    }

    await usersRepository.remove(checkUserExists);
  }
}

export default DeleteUserService;

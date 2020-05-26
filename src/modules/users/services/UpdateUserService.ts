import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users';

interface Request {
  id: string;
  name: string;
}

class UpdateUserService {
  public async execute({ id, name }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError('No user found with this ID.', 400);
    }

    user.name = name;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;

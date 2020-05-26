import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Post from '@modules/posts/infra/typeorm/entities/Posts';

interface Request {
  user_id: string;
  id: string;
}

class DeletePostService {
  public async execute({ user_id, id }: Request): Promise<void> {
    const postsRepository = getRepository(Post);

    const checkPostExists = await postsRepository.findOne({
      where: { id },
    });

    if (checkPostExists?.user_id !== user_id) {
      throw new AppError('Operation not permitted.', 401);
    }

    if (!checkPostExists) {
      throw new AppError('No post found with this ID', 400);
    }

    await postsRepository.remove(checkPostExists);
  }
}

export default DeletePostService;

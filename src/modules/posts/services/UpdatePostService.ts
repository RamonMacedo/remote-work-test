import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Post from '@modules/posts/infra/typeorm/entities/Posts';

interface Request {
  user_id: string;
  id: string;
  text: string;
}

class UpdatePostService {
  public async execute({ user_id, id, text }: Request): Promise<Post> {
    const postsRepository = getRepository(Post);

    const post = await postsRepository.findOne({
      where: { id },
    });

    if (post?.user_id !== user_id) {
      throw new AppError('Operation not permitted.', 401);
    }

    post.post = text;

    await postsRepository.save(post);

    return post;
  }
}

export default UpdatePostService;

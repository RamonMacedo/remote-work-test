import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Post from '@modules/posts/infra/typeorm/entities/Posts';

interface Request {
  auth: string;
  user_id: string;
  post: string;
}

class CreatePostService {
  public async execute({ auth, user_id, post }: Request): Promise<Post> {
    const postRepository = getRepository(Post);

    if (auth !== user_id) {
      throw new AppError('Operation not permitted.', 401);
    }

    const resPost = postRepository.create({
      user_id,
      post,
    });

    await postRepository.save(resPost);

    return resPost;
  }
}

export default CreatePostService;

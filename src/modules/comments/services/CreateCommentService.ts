import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Post from '@modules/posts/infra/typeorm/entities/Posts';
import Comment from '@modules/comments/infra/typeorm/entities/Comments';

interface Request {
  post_id: string;
  user_id: string;
  comment: string;
}

class CreatePostService {
  public async execute({
    post_id,
    user_id,
    comment,
  }: Request): Promise<Comment | undefined> {
    const postRepository = getRepository(Post);
    const commentRepository = getRepository(Comment);

    const resPostRepository = await postRepository.findOne({
      where: { id: post_id },
    });

    if (!resPostRepository) {
      throw new AppError('No post with this ID.', 400);
    }

    const resComment = commentRepository.create({
      post_id,
      user_id,
      comment,
    });

    delete resPostRepository.user.password;

    const { id: comment_id } = await commentRepository.save(resComment);

    const postComment = await commentRepository.findOne({
      where: { id: comment_id },
    });

    delete postComment?.post.user.password;

    return postComment;
  }
}

export default CreatePostService;

import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Comment from '@modules/comments/infra/typeorm/entities/Comments';

interface Request {
  id: string;
  user_id: string;
  text: string;
}

class UpdateCommentService {
  public async execute({ id, user_id, text }: Request): Promise<Comment> {
    const commentsRepository = getRepository(Comment);

    const commentPost = await commentsRepository.findOne({
      where: { id },
    });

    if (commentPost?.user_id !== user_id) {
      throw new AppError('Operation not permitted.', 401);
    }

    commentPost.comment = text;

    await commentsRepository.save(commentPost);

    return commentPost;
  }
}

export default UpdateCommentService;

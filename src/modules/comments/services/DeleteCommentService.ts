import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Comment from '@modules/comments/infra/typeorm/entities/Comments';

interface Request {
  id: string;
  user_id: string;
}

class DeleteCommentService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const commentsRepository = getRepository(Comment);

    const checkCommentExists = await commentsRepository.findOne({
      where: { id },
    });

    if (!checkCommentExists) {
      throw new AppError('No comment found', 400);
    }

    // Verifica se o dono do post é o mesmo que está logado
    // Se sim, ele pode excluir o comentário
    if (checkCommentExists.post.user_id === user_id) {
      await commentsRepository.remove(checkCommentExists);
      return;
    }

    // Verifica se o dono do comentário é o mesmo que está logado
    // Se sim, ele pode excluir o comentário
    if (checkCommentExists?.user_id !== user_id) {
      throw new AppError('Operation not permitted.', 401);
    }

    await commentsRepository.remove(checkCommentExists);
  }
}

export default DeleteCommentService;

import { Router } from 'express';

import { getRepository } from 'typeorm';
import Comment from '@modules/comments/infra/typeorm/entities/Comments';

import CreateCommentService from '@modules/comments/services/CreateCommentService';
import UpdateCommentService from '@modules/comments/services/UpdateCommentService';
import DeleteCommentService from '@modules/comments/services/DeleteCommentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const commentsRoutes = Router();

// Get all comments in one post of user
commentsRoutes.get(
  '/:post_id',
  ensureAuthenticated,
  async (request, response) => {
    const { post_id } = request.params;

    const commentRepository = getRepository(Comment);

    const resPosts = await commentRepository.find({ where: { post_id } });

    const postCommentRef = resPosts.map(resPos => {
      delete resPos.post.user.password;
      return resPos;
    });

    return response.json(postCommentRef);
  },
);

// Update the comment on the post if the user is the same as authenticated
commentsRoutes.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const user_id = request.user.id;
  const { comment } = request.body;

  const updateComment = new UpdateCommentService();

  const postRes = await updateComment.execute({
    id,
    user_id,
    text: comment,
  });

  delete postRes.post.user.password;

  return response.json(postRes);
});

// Insert a comment in a post.
commentsRoutes.post('/:id', ensureAuthenticated, async (request, response) => {
  const { id: post_id } = request.params;
  const user_id = request.user.id;
  const { comment } = request.body;

  const newComment = new CreateCommentService();

  const resComment = await newComment.execute({
    post_id,
    user_id,
    comment,
  });

  return response.json(resComment);
});

// Update the comment on the post if the user is the same as authenticated
commentsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;
    const user_id = request.user.id;

    const deleteComment = new DeleteCommentService();

    await deleteComment.execute({
      id,
      user_id,
    });

    return response.status(204).send();
  },
);

export default commentsRoutes;

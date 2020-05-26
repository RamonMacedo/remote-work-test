import { Router } from 'express';

import { getRepository } from 'typeorm';
import Post from '@modules/posts/infra/typeorm/entities/Posts';

import CreatePostService from '@modules/posts/services/CreatePostService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const postsRouter = Router();

postsRouter.get('/timeline', ensureAuthenticated, async (request, response) => {
  const postsRepository = getRepository(Post);

  const postUser = await postsRepository
    .createQueryBuilder('post')
    .orderBy('created_at', 'DESC')
    .getMany();

  if (!postUser) {
    return response.status(400).json('No post found with this ID');
  }

  return response.json(postUser);
});

postsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const user_id = request.user.id;

  const postsRepository = getRepository(Post);

  const postUser = await postsRepository.find({ where: { user_id } });

  if (!postUser) {
    return response.status(400).json('No post found with this ID');
  }

  const postUserRef = postUser.map(post => {
    delete post.user.password;
    return post;
  });

  return response.json(postUserRef);
});

postsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { user_id, post } = request.body;
  const auth = request.user.id;

  const createPost = new CreatePostService();

  const resPost = await createPost.execute({
    auth,
    user_id,
    post,
  });

  return response.json(resPost);
});

postsRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const user_id = request.user.id;

  const postsRepository = getRepository(Post);

  const postUser = await postsRepository.findOne({
    where: { id, user_id },
  });

  if (!postUser) {
    return response.status(400).json('No post found with this ID');
  }

  delete postUser.user.password;

  return response.json(postUser);
});

postsRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { post } = request.body;
  const { id } = request.params;
  const user_id = request.user.id;

  const updatePost = new UpdatePostService();

  const postRes = await updatePost.execute({
    user_id,
    id,
    text: post,
  });

  delete postRes.user.password;

  return response.json(postRes);
});

postsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const user_id = request.user.id;

  const deletePost = new DeletePostService();

  await deletePost.execute({
    user_id,
    id,
  });

  return response.status(204).send();
});

export default postsRouter;

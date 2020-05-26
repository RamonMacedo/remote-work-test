import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import postsRouter from '@modules/posts/infra/http/routes/posts.routes';
import commentsRoutes from '@modules/comments/infra/http/routes/comments.post.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/posts', postsRouter);
routes.use('/comments', commentsRoutes);

export default routes;

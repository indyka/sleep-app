import { Router } from 'express';
import * as controller from './controller';
import { auth } from './middlewares';

const routes = Router();

routes.post('/user/register', controller.user.register);
routes.post('/user/login', controller.user.login);
routes.post('/user/follow', auth, controller.user.follow);
routes.post('/user/unfollow', auth, controller.user.unfollow);

routes.get('/timeline', auth, controller.timeline.getTimeline);
routes.post('/timeline/sleep', auth, controller.timeline.setSleep);

export default routes;

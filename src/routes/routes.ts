import Router from 'koa-router';
import koa from 'koa';
import { UserRouter } from './user.router';
import { AuthRouter } from './auth.router';
import { Auth } from '../auth/auth';
import { TopicRouter } from './topic.router';
import { TaskRouter } from './task.router';

export class Routes {
    static init(server: koa) {
        const loginRouter = new Router();

        const router = new Router({
            prefix: '/api/v1'
        });
        
        router.use(Auth.autenticateMiddleware)

        AuthRouter.routes(loginRouter);
        UserRouter.routes(router);
        TopicRouter.routes(router);
        TaskRouter.routes(router);

        server.use(loginRouter.routes()).use(loginRouter.allowedMethods());
        server.use(router.routes()).use(router.allowedMethods());
    }
}
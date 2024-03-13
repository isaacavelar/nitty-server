import Router from 'koa-router';
import { UserController } from '../controllers/user.controller';

export class UserRouter {
    static routes(router: Router) {
        router.get('/users/authenticated', UserController.authenticatedUser);
    }
}
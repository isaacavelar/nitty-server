import Router from 'koa-router';
import { Auth } from '../auth/auth';
import { UserController } from '../controllers/user.controller';

export class AuthRouter {
    static routes(router: Router) {
        router.post('/auth/token', Auth.generateToken);
        router.post('/auth/refresh', Auth.refreshToken);
        router.post('/users', UserController.createUser);
    } 
}
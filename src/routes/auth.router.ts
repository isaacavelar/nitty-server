import Router from 'koa-router';
import { Auth } from '../auth/auth';

export class AuthRouter {
    static routes(router: Router) {
        router.post('/auth/token', Auth.generateToken);
        router.post('/auth/refresh', Auth.refreshToken);
    } 
}
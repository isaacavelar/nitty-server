import Router from 'koa-router';
import { TaskController } from '../controllers/task.controller';

export class TaskRouter {
    static routes(router: Router) {
        router.post('/tasks', TaskController.createTask);
    }
}
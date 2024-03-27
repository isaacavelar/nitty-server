import Router from 'koa-router';
import { TaskController } from '../controllers/task.controller';

export class TaskRouter {
    static routes(router: Router) {
        router.get('/tasks', TaskController.findUserTasks);
        router.get('/tasks/words', TaskController.findNextWords);
        router.post('/tasks', TaskController.createTask);
    }
}
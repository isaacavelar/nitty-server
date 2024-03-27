import Router from 'koa-router';
import { TopicController } from '../controllers/topic.controller';

export class TopicRouter {
    static routes(router: Router) {
        router.post('/topics', TopicController.createTopic);
    }
}
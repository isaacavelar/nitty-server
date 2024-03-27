import koa from 'koa';
import { Routes } from '../routes/routes';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import { dateConfig } from './date';

const server = new koa();

server.use(cors());
server.use(koaBody({}));
server.use(dateConfig);
Routes.init(server);

server.listen(3000, () => {
    console.log('🔥 HTTP Server runing!')
})
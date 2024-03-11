import koa from 'koa';
import { Routes } from '../routes/routes';
import koaBody from 'koa-body';
import cors from '@koa/cors';

const server = new koa();

server.use(cors());
server.use(koaBody({}));
Routes.init(server);

server.listen(3000, () => {
    console.log('🔥 HTTP Server runing!')
})
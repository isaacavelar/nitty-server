import { Context } from 'koa';
import "../server/index.d.ts";

export class ActivitiesController {
    public static async findAllActivites(ctx: Context, next: Function) {
        ctx.body = { tex: 'alo' }
        // ctx.user 
    }
}
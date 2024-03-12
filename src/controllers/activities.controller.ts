import { Context } from 'koa';

export class ActivitiesController {
    public static async findAllActivites(ctx: Context, next: Function) {

        ctx.body = { tex: 'alo' }
    }
}
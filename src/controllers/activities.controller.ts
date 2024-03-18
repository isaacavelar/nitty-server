import { Context } from 'koa';
import "../server/index.d.ts";
import activitiesModel from '../models/activities.model.js';
import { DefaultError } from '../interfaces/error.interface.js';

export class ActivitiesController {
    public static async findAllActivites(ctx: Context, next: Function) {
        const user = ctx.user;
        try {
            const activitie = await activitiesModel.find({
                user: user._id
            });

            ctx.body = activitie;
        } catch (err) {
            const error: DefaultError = {
                description: 'Erro ao se conectar com o servidor',
                title: 'Erro'
            }

            ctx.body = { error }
            ctx.status = 500;
        }
    }

    public static async createActivitie(ctx: Context, next: Function) {
    }
}
import { Context } from 'koa';
import topicModel, { Topic } from '../models/topic.model';
import { DefaultError } from '../interfaces/error.interface';

export class TopicController {
    public static async findAllTopics(ctx: Context, next: Function) {
        try {
            const topics = await topicModel.find();

            ctx.body = topics;
        } catch (err) {
            const error: DefaultError = {
                title: 'Erro',
                description: 'Erro ao comunicar com o servidor, por favor tente novamente mais tarde.'
            }

            ctx.body = { error }
            ctx.status = 500;
        }
    }

    public static async createTopic(ctx: Context, next: Function) {
        const payload: Topic = ctx.request.body;

        try {
            const createdTopic = await topicModel.create(payload);

            ctx.body = { 
                message: 'Tópico criado com sucesso.',
                topic: createdTopic 
            }
        } catch (err) {
            console.log(err);
            const error: DefaultError = {
                title: 'Não foi possivel criar um novo tópico',
                description: 'Erro ao comunicar com o servidor, por favor tente novamente mais tarde.'
            }

            ctx.body = { error }
            ctx.status = 500;
        }
    }
}
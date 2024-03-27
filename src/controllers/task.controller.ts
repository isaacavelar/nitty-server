import { Context } from 'koa';
import taskModel from '../models/task.model.js';
import { DefaultError } from '../interfaces/error.interface.js';
import { CreateTaskPayload } from '../interfaces/task.interface.js';
import topicsModel from '../models/topic.model.js';
import { Words } from '../interfaces/words.interface.js';

export class TaskController {
    public static async findUserTasks(ctx: Context, next: Function) {
        const user = ctx.user;
        try {
            const task = await taskModel.find({
                user: user._id
            });

            ctx.body = task;
        } catch (err) {
            const error: DefaultError = {
                description: 'Erro ao se conectar com o servidor',
                title: 'Erro'
            }

            ctx.body = { error }
            ctx.status = 500;
        }
    }

    public static async createTask(ctx: Context, next: Function) {
        const { topicId }: CreateTaskPayload = ctx.request.body;
        const user = ctx.user;

        const topic = await topicsModel.findById(topicId).lean();

        if (!topic) {
            const error: DefaultError = {
                title: 'Erro',
                description: 'Tópico não encontrado!'
            } 

            ctx.body = { error }
            ctx.status = 404;
            return;
        }

        const words: Words[] = topic.words.map(word => {
            return {
                word: word.word,
                currentDifficulty: '',
                qtdConsecutiveCorrectGuesses: 0,
                qtdConsecutiveVeryEasy: 0,
                status: 0,
                translation: word.translation
            }
        });

        try {
            const createdtask = await taskModel.create({
                name: topic.title,
                progress: 0,
                user: user._id,
                words: words
            });

            ctx.body = { message: 'Atividade criada com sucesso', task: createdtask }
        } catch (err)  {
            const error: DefaultError = {
                title: 'Não foi possivel cirar sua atividade',
                description: 'Erro ao comunicar com o servidor, por favor tente novamente mais tarde.'
            }

            ctx.body = { error }
            ctx.status = 500;
        }
    }

    public static async findNextWords(ctx: Context, next: Function) {
        const { taskId, qtdWords } = ctx.request.body;

        try {
            const task = await taskModel.findById(taskId);

            if (!task) {
                const error: DefaultError = {
                    title: 'Erro',
                    description: 'Tarefa não encontrada'
                }
    
                ctx.body = { error }
                ctx.status = 404;
                return;
            }

            const words = task.words.filter(word => {
                return word.status === 0
            }).slice(0, qtdWords || 30);

            ctx.body = { words }
        } catch (err) {
            const error: DefaultError = {
                title: 'Erro',
                description: 'Erro ao se conectar com o servidor'
            }

            ctx.body = { error }
            ctx.status = 500;
        }
    }
}
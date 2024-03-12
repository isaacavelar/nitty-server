// import { NittyContext as Context } from '../server';
import userModel from '../models/user.model';
import { DefaultError } from '../interfaces/error.interface';
import { CreateUserPayload } from '../interfaces/user.interface';
import { Context } from 'koa';

export class UserController {
    public static async createUser(ctx: Context, next: Function) {
        const data: CreateUserPayload = ctx.request.body;


        const userAlreadyExist = await userModel.findOne({
            email: data.email
        }).lean();

        if (userAlreadyExist) {
            const error: DefaultError = {
                description: 'Email já cadastrado, por favor faça login!',
                title: 'Erro ao criar o Usuario'
            }
            
            ctx.body = error
            ctx.status = 409;
            return;
        }

        try {
            const newUser = await userModel.create(data);

            ctx.body = { 
                message: 'Usuario criado com sucesso!',
                user: newUser 
            }
        } catch (err) {
            const error: DefaultError =  {
                description: 'Erro ao se conectar com o servidor',
                title: 'Erro ao criar o Usuario'
            }

            ctx.body = { error };
            ctx.status = 500;
        }
       
    }
}
import { Context } from 'koa';
import { AuthJwtDecode, AuthPayload } from '../interfaces/auth.interface';
import userModel, { User } from '../models/user.model';
import { DefaultError } from '../interfaces/error.interface';
import jwt from 'jsonwebtoken';

export class Auth {
    public static async generateToken(ctx: Context, next: Function) {
        const { email, password } : AuthPayload = ctx.request.body;

        const user = await userModel.findOne({
            email: email
        });

        if (!user) {
            const error: DefaultError = {
                description: 'Usuário ou senha inválidos, por favor verifique as credenciais!',
                title: 'Erro ao fazer login.'
            } 

            ctx.body = { error }
            ctx.status = 401;
            return;
        }

        const passwodIsValid = user.validPassword(password);

        if (!passwodIsValid) {
            const error: DefaultError = {
                description: 'Usuário ou senha inválidos, por favor verifique as credenciais!',
                title: 'Erro ao fazer login.'
            } 

            ctx.body = { error }
            ctx.status = 401;
            return;
        }

        const secret = process.env.JWT_SECRET as string;
        const refreshSecret = process.env.JWT_REFRESH as string;
        const expiresIn = 60 * 60 * 5;
        
        const token = jwt.sign({id: user._id.toString()}, secret, { expiresIn: expiresIn });
        const refreshToken = jwt.sign({id: user._id.toString()}, refreshSecret);

        ctx.user = user;
        
        ctx.body = {
            accessToken: token,
            refreshToken: refreshToken,
            expiresIn: expiresIn
        }
    }

    public static async refreshToken(ctx: Context, next: Function) {
        const { token, userId } = ctx.request.body;
        const refreshSecret = process.env.JWT_REFRESH as string;

        try {
            const decode = jwt.verify(token, refreshSecret) as AuthJwtDecode;

            if (decode.id != userId) {
                const error = {
                    title: 'Falha na autenticação.',
                    description: 'Falha na autenticação. RefreshToken invalido'
                }

                ctx.body = { error }
                ctx.status = 401;
                return;
            }

            const user = await userModel.findById(userId) as User;

            const secret = process.env.JWT_SECRET as string;
            const expiresIn = 60 * 60 * 5;
            
            const newToken = jwt.sign({id: user._id.toString()}, secret, { expiresIn: expiresIn });
            const newRefreshToken = jwt.sign({id: user._id.toString()}, refreshSecret);
    
            ctx.user = user;
    
            ctx.body = {
                accessToken: newToken,
                refreshToken: newRefreshToken,
                expiresIn: expiresIn
            }
        } catch (err) {
            const error: DefaultError = {
                description: 'Falha na autenticação. Por favor, refaça o login.',
                title: 'Sessão expirada.'
            }

            ctx.body = { error }
            ctx.status = 401;
            return;
        }
        

    }

    public static async autenticateMiddleware (ctx: Context, next: Function) {
        if (!ctx.header.authorization) {
            const error: DefaultError = {
                title: 'Erro ao se autenticar.',
                description: 'Falha na autenticação. Token invalido.'
            }

            ctx.body = { error }
            ctx.status = 401;
            return;
        }

        const token  = ctx.header.authorization;
        const secret = process.env.JWT_SECRET as string;
    
        try {
            const decode = jwt.verify(token, secret) as AuthJwtDecode;
            const user = await userModel.findById(decode.id).lean() as User;

            ctx.user = user;    
        
            await next();
        } catch (err) { 
            const error = {
                title: 'Sessão expirada.',
                description: 'Sessão expirada. Por favor, refaça o login.'
            }

            ctx.body = { error }
            ctx.status = 401
            return;
        }
       
    }
}
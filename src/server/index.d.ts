import { DefaultError } from "../interfaces/error.interface";
import { User } from "../models/user.model";
import Koa, { Context } from 'koa'

declare module "koa" {
    interface BaseContext {
        user: User;
        body: { error?: DefaultError, [key: string]: any }
    }
}

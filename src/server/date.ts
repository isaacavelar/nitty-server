import { Context } from 'koa';


export const dateConfig = async (ctx: Context, next: Function) => {
    const  formatDate = (date: Date) => {
        const day: string = ('0' + date.getDate()).slice(-2);
        const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
        const year: number = date.getFullYear();
        const hours: string = ('0' + date.getHours()).slice(-2);
        const minutes: string = ('0' + date.getMinutes()).slice(-2);
        const seconds: string = ('0' + date.getSeconds()).slice(-2);
    
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    
    const now: Date = new Date();
    const formattedDate: string = formatDate(now);

    ctx.date = formattedDate;

    await next();
}
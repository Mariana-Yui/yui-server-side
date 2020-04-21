import { Context } from 'egg';
import utils from '../utils';

export default function MusicMiddle(option: any = {}) {
    return async function (ctx: Context, next: () => Promise<any>) {
        const { query, body } = ctx.request;
        let answer = {};
        ctx.status.query = Object.assign({}, query, body, { cookie: ctx.get('Cookie') });
        console.log(ctx.get('Cookie'));
        try {
            await next();
            answer = ctx.status;
            console.log(JSON.stringify(answer));
        } catch (error) {
            console.log(error);
            answer = error;
            if (answer.body.code === 301) answer.body.msg = '需要登录';
        }
        ctx.set('Set-Cookie', answer.cookie);
        ctx.status = answer.status;
        ctx.body = utils.json(answer.body);
    };
}

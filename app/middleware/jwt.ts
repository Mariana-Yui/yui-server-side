import * as jwt from 'jsonwebtoken';
import { Context } from 'egg';

export default function Authentication(option: any) {
    option = option || {};
    return async (ctx: Context, next: () => Promise<any>) => {
        if (!ctx.url.match(/getLoginBg|getCaptcha/)) {
            const { request } = ctx;
            const { config } = ctx.app;
            const auth = request.get('Authorization');
            // 请求头带有token
            try {
                if (auth) {
                    const token = auth.split(' ')[1];
                    const payload: any = jwt.verify(token, config.jwt_key);
                    // 判断过期, 其实也不用判断:D
                    if (payload.exp) {
                        if (Date.now() >= payload.exp * 1000) {
                            ctx.status = 401;
                            ctx.body = { code: -1, message: 'token已过期' };
                            return;
                        }
                        // TODO
                        ctx.state.username = payload.username;
                    }
                }
            } catch (error) {
                // console.log(error);
                ctx.status = 401;
                ctx.body = { code: -1, message: 'token无效' };
                return;
            }
        }
        await next();
    };
}

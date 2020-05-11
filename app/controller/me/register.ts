import { Controller } from 'egg';

export default class RegisterController extends Controller {
    public async checkUsableEmail() {
        const { ctx, service } = this;
        const { email } = ctx.request.body;
        const res = await service.me.register.checkUsableEmail(ctx, email);
        ctx.body = res;
    }
    public async checkUsableUserInfo() {
        const { ctx, service } = this;
        const { code, email, username, password } = ctx.request.body;
        const res = await service.me.register.checkUsableUserInfo(
            ctx,
            code,
            email,
            username,
            password
        );
        ctx.body = res;
    }
}

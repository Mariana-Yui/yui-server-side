import { Controller } from 'egg';

export default class LoginController extends Controller {
    public async testToken() {
        const { ctx, service } = this;
        const { email, password } = ctx.request.body;
        const res = await service.me.login.testToken(ctx, email, password);
        ctx.body = res;
    }
}

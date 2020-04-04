import { Controller } from 'egg';

export default class LoginController extends Controller {
    public async getCaptcha() {
        const { service, ctx } = this;
        const res = await service.login.getCaptcha(); // svg-captcha create return Promise
        ctx.body = res;
    }
    public async getLoginBg() {
        const { service, ctx } = this;
        const buffer = await service.login.getLoginBg();
        ctx.body = buffer;
    }
    public async testToken() {
        const { service, ctx } = this;
        const res = await service.login.testToken(ctx);
        ctx.body = res;
    }
}

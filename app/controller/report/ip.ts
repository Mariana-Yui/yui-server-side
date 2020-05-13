import { Controller } from 'egg';

export default class ReportIPController extends Controller {
    public async setLastLoginLocation() {
        const { ctx } = this;
        console.log(
            ctx.request.get('X-Real-IP'),
            ctx.request.get('X-Forwarded-For'),
            ctx.request.ip.replace(/::ffff:/, '')
        );
        ctx.body = '';
    }
}

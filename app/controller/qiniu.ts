import { Controller } from 'egg';

export default class QiniuController extends Controller {
    public async getUpToken() {
        const { ctx, service } = this;
        const res = await service.qiniu.getUPToken();
        ctx.body = res;
    }
}

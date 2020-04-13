import { Controller } from 'egg';

export default class PublishController extends Controller {
    public async getAllUsername() {
        const { ctx, service } = this;
        const res = await service.article.publish.getAllUsername(ctx);
        ctx.body = res;
    }
}

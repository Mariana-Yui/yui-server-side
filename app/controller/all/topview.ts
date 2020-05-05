import { Controller } from 'egg';

export default class TopViewController extends Controller {
    public async getTopViewArticles() {
        const { ctx, service } = this;
        const res = await service.all.topview.getTopViewArticles(ctx);
        ctx.body = res;
    }
}

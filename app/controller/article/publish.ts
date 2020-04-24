import { Controller } from 'egg';

export default class PublishController extends Controller {
    public async getAllUsername() {
        const { ctx, service } = this;
        const res = await service.article.publish.getAllUsername(ctx);
        ctx.body = res;
    }
    public async saveArticle() {
        const { ctx, service } = this;
        const { article, type, isDemo } = ctx.request.body;
        const res = await service.article.publish.saveArticle(ctx, article, type, isDemo);
        ctx.body = res;
    }
}

import { Controller } from 'egg';

export default class PublishController extends Controller {
    public async getAllUsername() {
        const { ctx, service } = this;
        const res = await service.article.publish.getAllUsername(ctx);
        ctx.body = res;
    }
    public async saveArticle() {
        const { ctx, service } = this;
        const { article, type, isDemo, _id } = ctx.request.body;
        const res = await service.article.publish.saveArticle(ctx, article, type, isDemo, _id);
        ctx.body = res;
    }
    public async getArticleInfo() {
        const { ctx, service } = this;
        const { _id, author_id, type } = ctx.request.query;
        const res = await service.article.publish.getArticleInfo(ctx, _id, author_id, type);
        ctx.body = res;
    }
}

import { Controller } from 'egg';

export default class ArticleController extends Controller {
    public async getArticleRegular() {
        const { ctx, service } = this;
        const { suffix } = ctx.request.body;
        const res = await service.yui.recommend.getArticleRegular(ctx, suffix);
        ctx.body = res;
    }
    public async getLatestArticle() {
        const { ctx, service } = this;
        const { suffix } = ctx.request.body;
        const res = await service.yui.recommend.getLatestArticle(ctx, suffix);
        ctx.body = res;
    }
}

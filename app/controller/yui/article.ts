import { Controller } from 'egg';

export default class ArticleController extends Controller {
    public async getArticleRegular() {
        const { ctx, service } = this;
        const { suffix } = ctx.request.body;
        const res = await service.yui.article.getArticleRegular(ctx, suffix);
        ctx.body = res;
    }
}

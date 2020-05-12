import { Controller } from 'egg';

export default class ArticleController extends Controller {
    public async getArticleContent() {
        const { ctx, service } = this;
        const { id } = ctx.request.body;
        const res = await service.me.article.getArticleContent(ctx, id);
        ctx.body = res;
    }
    public async subscribeAuthorOrNot() {
        const { ctx, service } = this;
        const { id, author_id } = ctx.request.body;
        const res = await service.me.article.subscribeAuthorOrNot(ctx, id, author_id);
        ctx.body = res;
    }
}

import { Controller } from 'egg';

export default class ListController extends Controller {
    // public async getAllTypedArticle() {
    //     const { ctx, service } = this;
    //     const { _id, type } = ctx.request.query;
    //     const res = await service.article.list.getAllTypedArticle(ctx, _id, type);
    //     ctx.body = res;
    // }
    public async delTypedArticle() {
        const { ctx, service } = this;
        const { article_id, author_id, type } = ctx.request.body;
        const res = await service.article.list.delTypedArticle(ctx, article_id, author_id, type);
        ctx.body = res;
    }
    public async toggleArticleStatus() {
        const { ctx, service } = this;
        const { article_id, status, which, type } = ctx.request.body;
        const res = await service.article.list.toggleArticleStatus(
            ctx,
            article_id,
            status,
            which,
            type
        );
        ctx.body = res;
    }
    public async searchArticleByKeywords() {
        const { ctx, service } = this;
        const { _id, keywords, type } = ctx.request.query;
        const res = await service.article.list.searchArticleByKeywords(ctx, _id, keywords, type);
        ctx.body = res;
    }
}

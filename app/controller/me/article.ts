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
    public async addArticleViews() {
        const { ctx, service } = this;
        const { id } = ctx.request.query;
        const res = await service.me.article.addArticleViews(ctx, id);
        ctx.body = res;
    }
    public async publishComment() {
        const { ctx, service } = this;
        const { id, article_id, comment, type } = ctx.request.body;
        const res = await service.me.article.publishComment(ctx, id, article_id, comment, type);
        ctx.body = res;
    }
    public async deleteComment() {
        const { ctx, service } = this;
        const { comment_id, article_id, type } = ctx.request.body;
        const res = await service.me.article.deleteComment(ctx, comment_id, article_id, type);
        ctx.body = res;
    }
    public async likeCommentOrNot() {
        const { ctx, service } = this;
        const { id, comment_id, type } = ctx.request.body;
        const res = await service.me.article.likeCommentOrNot(ctx, id, comment_id, type);
        ctx.body = res;
    }
}

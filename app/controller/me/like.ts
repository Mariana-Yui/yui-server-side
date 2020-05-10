import { Controller } from 'egg';

export default class LikeController extends Controller {
    public async likeArticleOrNot() {
        const { ctx, service } = this;
        const { id, article_id, type } = ctx.request.body;
        const res = await service.me.like.likeArticleOrNot(ctx, id, article_id, type);
        ctx.body = res;
    }
}

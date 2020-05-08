import { Controller } from 'egg';

export default class CollectionController extends Controller {
    public async getTypedArticleCollection() {
        const { ctx, service } = this;
        const { type, id } = ctx.request.body;
        const res = await service.me.collection.getTypedArticleCollection(ctx, type, id);
        ctx.body = res;
    }
    public async collectArticleOrNot() {
        const { ctx, service } = this;
        const { id, article_id, type } = ctx.request.body;
        const res = await service.me.collection.collectArticleOrNot(ctx, id, article_id, type);
        ctx.body = res;
    }
}

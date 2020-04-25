import { Controller } from 'egg';

export default class ListController extends Controller {
    public async getAllTypedArticle() {
        const { ctx, service } = this;
        const { _id, type } = ctx.request.query;
        const res = await service.article.list.getAllTypedArticle(ctx, _id, type);
        ctx.body = res;
    }
}

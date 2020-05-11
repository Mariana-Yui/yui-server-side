import { Controller } from 'egg';

export default class SearchController extends Controller {
    public async getTypedArticles() {
        const { ctx, service } = this;
        const { type, size, skip } = ctx.request.body;
        const res = await service.me.search.getTypedArticles(ctx, type, size, skip);
        ctx.body = res;
    }
}

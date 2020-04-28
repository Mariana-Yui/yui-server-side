import { Controller } from 'egg';

export default class DetailController extends Controller {
    public async getUserDetailsByKeywords() {
        const { ctx, service } = this;
        const { size, page, keyword } = ctx.request.query;
        const res = await service.user.detail.getUserDetailsByKeywords(
            ctx,
            Number(size),
            Number(page),
            keyword
        );
        ctx.body = res;
    }
}

import { Controller } from 'egg';

export default class SpaceController extends Controller {
    public async getUserDetails() {
        const { ctx, service } = this;
        const { id } = ctx.request.body;
        const res = await service.me.space.getUserDetails(ctx, id);
        ctx.body = res;
    }
    public async checkSubscribe() {
        const { ctx, service } = this;
        const { id, following } = ctx.request.query;
        const res = await service.me.space.checkSubscribe(ctx, id, following);
        ctx.body = res;
    }
}

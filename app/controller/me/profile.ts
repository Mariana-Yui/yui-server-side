import { Controller } from 'egg';

export default class ProfileController extends Controller {
    public async getUserProfile() {
        const { ctx, service } = this;
        const { id } = ctx.request.body;
        const res = await service.me.profile.getUserInfo(ctx, id);
        ctx.body = res;
    }
}

import { Controller } from 'egg';

export default class BannerController extends Controller {
    public async getBannerInfo() {
        const { ctx, service } = this;
        const res = await service.all.banner.getBannerInfo(ctx);
        ctx.body = res;
    }
}

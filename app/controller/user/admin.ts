import { Controller } from 'egg';

export default class AdminController extends Controller {
    public async getAdminList() {
        const { ctx, service } = this;
        const { size, page } = ctx.request.query;
        const res = await service.user.admin.getAdminList(ctx, Number(size), Number(page));
        ctx.body = res;
    }
    public async getTotalNumber() {
        const { ctx, service } = this;
        const res = await service.user.admin.getTotalNumber(ctx);
        ctx.body = res;
    }
    public async toggleStatus() {
        const { ctx, service } = this;
        const { username: admin } = ctx.state;
        const { username, enable } = ctx.request.query;
        const res = await service.user.admin.toggleStatus(ctx, admin, username, enable);
        ctx.body = res;
    }
    public async getAdminByKeywords() {
        const { ctx, service } = this;
        const { input: keyword, size, page } = ctx.request.query;
        const res = await service.user.admin.getAdminByKeywords(
            ctx,
            keyword,
            Number(size),
            Number(page)
        );
        ctx.body = res;
    }
    public async createNewAdmin() {
        const { ctx, service } = this;
        const { info } = ctx.request.body;
        const res = await service.user.admin.createNewAdmin(ctx, info);
        ctx.body = res;
    }
}

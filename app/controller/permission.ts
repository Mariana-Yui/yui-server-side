import { Controller } from 'egg';

export default class PermissionController extends Controller {
    public async getUserRole() {
        const { ctx, service } = this;
        const { username } = ctx.request.query;
        const res = await service.permission.getUserRole(ctx, username);
        ctx.body = res;
    }
}

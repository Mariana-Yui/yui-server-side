import { Controller } from 'egg';

export default class ProfileController extends Controller {
    public async checkUserExist() {
        const { ctx, service } = this;
        const { username } = ctx.query;
        const res = await service.profile.checkUserExist(ctx, username);
        ctx.body = res;
    }
    public async updateProfile() {
        const { ctx, service } = this;
        const newProfile = ctx.request.body;
        const res = await service.profile.updateProfile(ctx, newProfile.username, newProfile);
        ctx.body = res;
    }
    public async checkPassword() {
        const { ctx, service } = this;
        const { username, password } = ctx.request.body;
        const res = await service.profile.checkPassword(ctx, username, password);
        ctx.body = res;
    }
    public async updatePassword() {
        const { ctx, service } = this;
        const { username, password } = ctx.request.body;
        const res = await service.profile.updateProfile(ctx, username, password);
        ctx.body = res;
    }
}

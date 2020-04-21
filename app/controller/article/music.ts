import { Controller } from 'egg';

export default class MusicController extends Controller {
    public async loginByPhone() {
        const { ctx, service } = this;
        await service.music.loginByPhone;
    }
}

import { Controller } from 'egg';
import utils from '../../utils';

export default class MusicController extends Controller {
    public async getNetEaseVIPCookie() {
        const { ctx, service } = this;
        const { query, body } = ctx.request;
        ctx.state.query = Object.assign({}, query, body, {
            cookie: utils.convertToObject(ctx.get('Cookie'))
        });
        await service.me.music.getNetEaseVIPCookie(ctx);
    }
    public async updateMusicUrls() {
        const { ctx, service } = this;
        const { music_info, id } = ctx.request.body;
        const res = await service.me.music.updateMusicUrls(ctx, id, music_info);
        ctx.body = res;
    }
}

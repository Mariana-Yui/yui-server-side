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
}

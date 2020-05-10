import { Controller } from 'egg';
import utils from '../../utils';

export default class MusicController extends Controller {
    public async searchMusicByKeywords() {
        const { ctx, service } = this;
        const { query, body } = ctx.request;
        ctx.state.query = Object.assign({}, query, body, {
            cookie: utils.convertToObject(ctx.get('Cookie'))
        });
        const res = await service.article.music.searchMusicByKeywords(ctx, 0);
        ctx.body = res;
    }
    public async getMusicByDefaultKeywords() {
        const { ctx, service } = this;
        const { query, body } = ctx.request;
        ctx.state.query = Object.assign({}, query, body, {
            cookie: utils.convertToObject(ctx.get('Cookie'))
        });
        const res = await service.article.music.getMusicByDefaultKeywords(ctx);
        ctx.body = res;
    }
    public async getSpecificSongUrls() {
        const { ctx, service } = this;
        const { query, body } = ctx.request;
        ctx.state.query = Object.assign({}, query, body, {
            cookie: utils.convertToObject(ctx.get('Cookie'))
        });
        const res = await service.article.music.getSpecificSongUrls(ctx);
        ctx.body = res;
    }
    public async getNetEaseVIP() {
        const { ctx, service } = this;
        const { query, body } = ctx.request;
        ctx.state.query = Object.assign({}, query, body, {
            cookie: utils.convertToObject(ctx.get('Cookie'))
        });
        await service.article.music.getNetEaseVIP(ctx);
    }
}

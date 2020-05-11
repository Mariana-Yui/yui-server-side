// 利用PC端之前写好的接口获取移动端的网易云音乐会员cookie信息
import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class MusicService extends Service {
    public async getNetEaseVIPCookie(ctx: Context) {
        const { query } = ctx.state;
        const isLogin = await this.service.article.music.checkLoginStatus(query);
        console.log(isLogin);
        if (!isLogin) {
            await this.service.article.music.loginByPhone(query);
        }
        ctx.status = 204;
    }
    public async updateMusicUrls(ctx: Context, _id: string, music_info: any) {
        const { MusicArticle } = ctx.model.Article as any;
        try {
            const article = await (MusicArticle as Model<any, {}>).findOneAndUpdate(
                { _id },
                { music_info },
                { new: true }
            );
            if (article != null) {
                return utils.json(0, 'update latest music url', article);
            }
            throw Error('failed to update music url');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

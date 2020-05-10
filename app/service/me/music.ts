// 利用PC端之前写好的接口获取移动端的网易云音乐会员cookie信息
import { Service, Context } from 'egg';

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
}

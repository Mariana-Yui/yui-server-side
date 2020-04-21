/* eslint-disable no-eval */
import { Service, Context } from 'egg';
import * as crypto from 'crypto';
import request from '../../utils/request';
import utils from '../../utils';

export default class MusicService extends Service {
    private async loginByPhone(query: Record<string, any>) {
        const { ctx } = this;
        const { account, music_api_base_url } = ctx.app.config;
        query.cookie.os = 'pc';
        const data = {
            phone: account.phone,
            countrycode: (account as any).countrycode,
            password: crypto.createHash('md5').update(account.password).digest('hex'),
            rememberLogin: 'true'
        };
        try {
            const { cookie }: { cookie: Array<string> } = await request(
                'POST',
                `${music_api_base_url}/weapi/login/cellphone`,
                data,
                {
                    crypto: 'weapi',
                    ua: 'pc',
                    cookie: query.cookie,
                    proxy: query.proxy
                }
            );
            ctx.set('Set-Cookie', cookie);
            cookie.forEach((c: string) => {
                const tmp = c.replace(/;\sExpires.*$/, '');
                const [name, value] = tmp.split('=');
                query.cookie[name] = value;
            });
        } catch (error) {
            console.log(error);
            return '';
        }
    }
    private async checkLoginStatus(query: Record<string, any>) {
        const { ctx } = this;
        const { music_api_base_url } = ctx.app.config;
        try {
            const response = await request(
                'GET',
                music_api_base_url,
                {},
                { cookie: query.cookie, proxy: query.proxy }
            );
            eval(`(${/GUser\s*=\s*([^;]+);/.exec(response.body)[1] as any})`);
            eval(`(${/GBinds\s*=\s*([^;]+);/.exec(response.body)[1] as any})`);
            return true;
        } catch (err) {
            return false;
        }
    }
    private getSongDetail(
        query: Record<string, any>,
        id: number | string,
        music_api_base_url: string
    ): Promise<any> {
        query.ids = String(id).split(/\s*,\s*/);
        const data = {
            c: '[' + query.ids.map((id: number | string) => '{"id":' + id + '}').join(',') + ']',
            ids: '[' + query.ids.join(',') + ']'
        };
        return request('POST', `${music_api_base_url}/weapi/v3/song/detail`, data, {
            crypto: 'weapi',
            cookie: query.cookie,
            proxy: query.proxy
        });
    }
    public async searchMusicByKeywords(ctx: Context, level: number) {
        const { query } = ctx.state;
        const isLogin = await this.checkLoginStatus(query);
        if (!isLogin) {
            await this.loginByPhone(query);
            if (level < 2) {
                this.searchMusicByKeywords(ctx, level + 1);
            } else {
                ctx.body = utils.json(-1, '未知错误');
            }
        } else {
            const { music_api_base_url } = ctx.app.config;
            const data = {
                s: query.keywords,
                type: query.type || 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
                limit: query.limit || 30,
                offset: query.offset || 0
            };
            try {
                // 关键词返回数据, 其中封面图片url是失效的,还要根据歌曲id查找song/detail
                const answer = await request(
                    'POST',
                    `${music_api_base_url}/weapi/search/get`,
                    data,
                    {
                        crypto: 'weapi',
                        cookie: query.cookie,
                        proxy: query.proxy
                    }
                );
                // 并行promise
                ctx.status = answer.status;
                const pendings: Array<Promise<any>> = answer.body.result.songs.map((song: any) => {
                    return this.getSongDetail(query, song.id, music_api_base_url);
                });
                try {
                    const resolves = await Promise.all(pendings);
                    const songs = resolves.map((res: any) => {
                        // 将音乐文件url加入json
                        return Object.assign({}, res.body.songs[0], {
                            songUrl: `https://music.163.com/song/media/outer/url?id=${res.body.songs[0].id}.mp3`
                        });
                    });
                    return utils.json(0, '搜索成功', songs);
                } catch (error) {
                    console.log(error);
                    return utils.json(-1, '查询歌曲信息失败');
                }
            } catch (error) {
                console.log(error);
                return utils.json(-1, '搜索失败');
            }
        }
    }
}

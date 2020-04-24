/* eslint-disable default-case */
import { Service, Context } from 'egg';
import utils from '../../utils';

export default class PublishService extends Service {
    public async getAllUsername(ctx: Context) {
        const { Admin } = ctx.model;
        try {
            const users = await Admin.find();
            const usernames = users.map((user: any) => user.username);
            return utils.json(0, '查找成功', { user: usernames });
        } catch (error) {
            console.log(error);
            return utils.json(-1, '查找失败');
        }
    }
    public async saveArticle(ctx: Context, article: any, type: string, isDemo: boolean) {
        const {
            ReadingArticle,
            MusicArticle,
            FilmArticle,
            BroadcastArticle
        } = (ctx.model as any).Article;
        const { Admin } = ctx.model;
        const {
            title,
            author,
            cover: cover_img,
            publishDate: update_time,
            content,
            abstract,
            music_info,
            film_info,
            broadcast
        } = article;
        const commonPart = {
            title,
            author,
            cover_img,
            content,
            update_time,
            status: isDemo ? 0 : 1
        };
        try {
            let savedArticle, userId;
            try {
                // 查找用户id作为外键, 也可以前端直接传
                userId = (await Admin.findOne({ username: author }))._id;
            } catch (error) {
                return utils.json(-1, error.message);
            }
            // 指定外键要把外键关联表的相应字段填入外键中, 否则找不到的quq
            switch (type) {
                case 'read': {
                    savedArticle = await ReadingArticle.create(
                        Object.assign({ author_info: userId }, commonPart, { abstract })
                    );
                    break;
                }
                case 'music': {
                    savedArticle = await MusicArticle.create(
                        Object.assign({ author_info: userId }, commonPart, { music_info })
                    );
                    break;
                }
                case 'film': {
                    savedArticle = await FilmArticle.create(
                        Object.assign({ author_info: userId }, commonPart, { film_info })
                    );
                    break;
                }
                case 'broadcast': {
                    savedArticle = await BroadcastArticle.create(
                        Object.assign({ author_info: userId }, commonPart, { broadcast })
                    );
                    break;
                }
            }
            return utils.json(0, isDemo ? '保存草稿成功!' : '文章已发布, 待审核...', {
                article_id: savedArticle._id
            });
        } catch (error) {
            console.log(error);
            return utils.json(-1, '保存文章失败, 请重试');
        }
    }
}

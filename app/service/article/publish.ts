/* eslint-disable default-case */
import { Service, Context } from 'egg';
import * as _ from 'lodash';
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
    // _id为article id
    public async saveArticle(
        ctx: Context,
        article: any,
        type: string,
        isDemo: boolean,
        _id: string
    ) {
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
            broadcast: broadcast_url
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
                    // ''create, 非''update
                    if (_id === '') {
                        savedArticle = await ReadingArticle.create(
                            Object.assign({ author_info: userId }, commonPart, { abstract })
                        );
                    } else {
                        savedArticle = await ReadingArticle.findOneAndUpdate(
                            { _id },
                            Object.assign({ author_info: userId }, commonPart, { abstract })
                        );
                    }
                    break;
                }
                case 'music': {
                    if (_id === '') {
                        savedArticle = await MusicArticle.create(
                            Object.assign({ author_info: userId }, commonPart, { music_info })
                        );
                    } else {
                        savedArticle = await MusicArticle.findOneAndUpdate(
                            { _id },
                            Object.assign({ author_info: userId }, commonPart, { music_info })
                        );
                    }
                    break;
                }
                case 'film': {
                    if (_id === '') {
                        savedArticle = await FilmArticle.create(
                            Object.assign({ author_info: userId }, commonPart, { film_info })
                        );
                    } else {
                        savedArticle = await FilmArticle.findOneAndUpdate(
                            { _id },
                            Object.assign({ author_info: userId }, commonPart, { film_info })
                        );
                    }
                    break;
                }
                case 'broadcast': {
                    if (_id === '') {
                        savedArticle = await BroadcastArticle.create(
                            Object.assign({ author_info: userId }, commonPart, { broadcast_url })
                        );
                    } else {
                        savedArticle = await BroadcastArticle.findOneAndUpdate(
                            { _id },
                            Object.assign({ author_info: userId }, commonPart, { broadcast_url })
                        );
                    }
                    break;
                }
            }
            if (!savedArticle) {
                return utils.json(-1, '文章id不存在, 请勿进行违规操作');
            }
            return utils.json(0, isDemo ? '保存草稿成功!' : '文章已发布, 待审核...', {
                article_id: savedArticle._id
            });
        } catch (error) {
            console.log(error);
            return utils.json(-1, '保存文章失败, 请重试');
        }
    }
    public async getArticleInfo(ctx: Context, _id: string, author_id: string, type: string) {
        try {
            const {
                ReadingArticle,
                MusicArticle,
                FilmArticle,
                BroadcastArticle
            } = (ctx.model as any).Article;
            const { Admin } = ctx.model;
            const { username } = ctx.state;
            const user = await Admin.findOne({ username });
            if (!(user && (user.role === 'admin' || user._id === author_id))) {
                return utils.json(-1, '违规操作');
            }
            let article;
            switch (type) {
                case 'read': {
                    article = await ReadingArticle.findById(_id);
                    break;
                }
                case 'film': {
                    article = await FilmArticle.findById(_id);
                    break;
                }
                case 'music': {
                    article = await MusicArticle.findById(_id);
                    break;
                }
                case 'broadcast': {
                    article = await BroadcastArticle.findById(_id);
                }
            }
            if (article != null) {
                article = _.omit(article.toObject(), [
                    'collects',
                    'comment',
                    'likes',
                    'views',
                    '__v',
                    'status',
                    'pre_release_time',
                    'is_top',
                    'enable'
                ]);
                return utils.json(0, '获取文章信息成功', article);
            }
            throw Error('文章id不存在');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

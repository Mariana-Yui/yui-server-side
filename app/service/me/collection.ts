import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class CollectionService extends Service {
    public async getTypedArticleCollection(ctx: Context, type: string, id: string) {
        const { Admin } = ctx.model;
        try {
            const user = await Admin.findById(id).populate({
                path: 'details',
                populate: {
                    path: `collected.${type}_article`,
                    select: [
                        '_id',
                        'abstract',
                        'music_info',
                        'film_info',
                        'author',
                        'cover_img',
                        'title',
                        'publish_time',
                        'likes',
                        'collects'
                    ]
                }
            });
            if (user != null) {
                return utils.json(
                    0,
                    `get ${type} collection`,
                    user.toObject().details.collected[`${type}_article`]
                );
            }
            throw Error(`can't get ${type} collection`);
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
    public async collectArticleOrNot(ctx: Context, _id: string, article_id: string, type: string) {
        const { Admin, User } = ctx.model;
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        const maps = {
            read: ReadingArticle,
            music: MusicArticle,
            film: FilmArticle,
            broadcast: BroadcastArticle
        };
        try {
            let user, details, article;
            if (/removeCollectArticle/.test(ctx.path)) {
                user = await Admin.findById(_id);
                // user.details.save()这种方式截至目前官方还不支持
                details = await User.findById(user.details);
                const index = (details.collected[`${type}_article`] as Array<string>).indexOf(
                    article_id
                );
                if (index > -1) {
                    details.collected[`${type}_article`].splice(index, 1);
                    await details.save();
                }
                article = await (maps[type] as Model<any, {}>).findById(article_id);
                const index_2 = (article.collects as Array<string>).indexOf(_id);
                if (index_2 > -1) {
                    article.collects.splice(index_2, 1);
                    await article.save();
                }
            } else {
                user = await Admin.findById(_id);
                details = await User.findById(user.details);
                if (!(details.collected[`${type}_article`] as Array<string>).includes(article_id)) {
                    details.collected[`${type}_article`].push(article_id);
                    await details.save();
                }
                article = await (maps[type] as Model<any, {}>).findById(article_id);
                if (!(article.collects as Array<string>).includes(_id)) {
                    article.collects.push(_id);
                    await article.save();
                }
            }
            return utils.json(0, 'collection operation succussfully', {
                _id: user._id,
                article_id: article._id
            });
        } catch (error) {
            console.log(error);
            return utils.json(-1, error.message);
        }
    }
}

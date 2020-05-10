import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class LikeService extends Service {
    public async likeArticleOrNot(ctx: Context, id: string, article_id: string, type: string) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        const maps = {
            read: ReadingArticle,
            music: MusicArticle,
            film: FilmArticle,
            broadcast: BroadcastArticle
        };
        let article;
        try {
            if (/removeLikeArticle/.test(ctx.path)) {
                article = await (maps[type] as Model<any, {}>).findById(article_id);
                const index = (article.likes as Array<string>).indexOf(id);
                if (index > -1) {
                    (article.likes as Array<string>).splice(index, 1);
                    await article.save();
                }
            } else {
                // 点赞
                article = await (maps[type] as Model<any, {}>).findById(article_id);
                if (!(article.likes as Array<string>).includes(id)) {
                    (article.likes as Array<string>).push(id);
                    await article.save();
                }
            }
            return utils.json(0, 'like operation successfully', {
                _id: id,
                article_id: article._id
            });
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class ArticleService extends Service {
    public async getArticleContent(ctx: Context, id: string) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        try {
            const fullfill = [ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle].map(
                (Article: Model<any, {}>) => {
                    return Article.findById(id).populate({
                        path: 'author_info',
                        select: ['avatar', 'username', 'description'],
                        populate: {
                            path: 'details',
                            select: ['followers']
                        }
                    });
                }
            );
            let article = await Promise.all(fullfill);
            article = article.filter((a: any) => a);
            if (article && article.length) {
                return utils.json(0, 'get article content successfully', article[0].toObject());
            }
            throw Error('failed to get article content');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
    public async subscribeAuthorOrNot(ctx: Context, id: string, author_id: string) {
        const { Admin, User } = ctx.model;
        try {
            if (/removeSubscribeAuthor/.test(ctx.path)) {
                let user = await Admin.findById(id);
                let details = await User.findById(user.details);
                let index = (details.following as Array<string>).indexOf(author_id);
                if (index > -1) {
                    (details.following as Array<string>).splice(index, 1);
                    await details.save();
                }
                user = await Admin.findById(author_id);
                details = await User.findById(user.details);
                index = (details.followers as Array<string>).indexOf(id);
                if (index > -1) {
                    (details.followers as Array<string>).splice(index, 1);
                    await details.save();
                }
                return utils.json(0, '取消关注作者成功');
            }
            let user = await Admin.findById(id);
            let details = await User.findById(user.details);
            if (!(details.following as Array<string>).includes(author_id)) {
                (details.following as Array<string>).push(author_id);
                await details.save();
            }
            user = await Admin.findById(author_id);
            details = await User.findById(user.details);
            if (!(details.followers as Array<string>).includes(id)) {
                (details.followers as Array<string>).push(id);
                await details.save();
            }
            return utils.json(0, '关注作者成功');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

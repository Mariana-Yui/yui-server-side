import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class ArticleService extends Service {
    public async getArticleRegular(ctx: Context, suffix?: Date | undefined) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        try {
            const sorted = await [
                ReadingArticle,
                MusicArticle,
                FilmArticle,
                BroadcastArticle
            ].reduce(async (prev: Array<any>, cur: Model<any, {}>) => {
                const resolve = await prev;
                let article = await cur
                    .find(suffix ? { publish_time: { $lt: suffix } } : {}, [
                        'title',
                        'author',
                        'likes',
                        'publish_time',
                        'cover_img'
                    ])
                    .sort({ publish_time: -1 });
                article = article.map((art: any) => art.toObject());
                return resolve
                    .concat(article)
                    .sort((a, b) => +new Date(b.publish_time) - +new Date(a.publish_time));
            }, Promise.resolve([]));
            if (sorted != null) {
                return utils.json(0, 'get article regularly', sorted.slice(0, 4));
            }
            throw Error('获取失败');
        } catch (error) {
            console.log(error);
            return utils.json(-1, error.message);
        }
    }
    public async getLatestArticle(ctx: Context, prefix: Date) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        const sorted: Array<any> = await [
            ReadingArticle,
            MusicArticle,
            FilmArticle,
            BroadcastArticle
        ].reduce(async (prev: Array<any>, cur: Model<any, {}>) => {
            const resolve = await prev;
            let article = await cur
                .find({ publish_time: { $gt: prefix } })
                .sort({ publish_time: -1 });
            article = article.map((art: any) => art.toObject());
            return resolve
                .concat(article)
                .sort((a, b) => +new Date(b.publish_time) - +new Date(a.publish_time));
        }, Promise.resolve([]));
        if (sorted != null) {
            return utils.json(0, 'get latest article successfully', sorted.slice(-4));
        }
    }
}

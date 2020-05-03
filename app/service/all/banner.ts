import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class BannerService extends Service {
    public async getBannerInfo(ctx: Context) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        try {
            const topArticles = await [
                ReadingArticle,
                MusicArticle,
                FilmArticle,
                BroadcastArticle
            ].reduce(async (prev: Array<any>, curModel: Model<any, {}>) => {
                const articles = await prev;
                let curArticles = await curModel.find({ is_top: true, status: 4 });
                curArticles = curArticles.map((article: any) => ({
                    id: article._id,
                    src: article.cover_img
                }));
                return articles.concat(curArticles);
            }, Promise.resolve([]));
            return utils.json(0, 'get banner info', topArticles.slice(0, 5));
        } catch (error) {
            console.log(error);
            return utils.json(-1, error.message);
        }
    }
}

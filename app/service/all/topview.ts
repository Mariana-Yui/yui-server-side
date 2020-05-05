import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class TopViewService extends Service {
    public async getTopViewArticles(ctx: Context) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        try {
            const fullfill = [ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle].map(
                (article: Model<any, {}>) => {
                    return article
                        .find({}, [
                            'cover_img',
                            'views',
                            'author',
                            'title',
                            '_id',
                            'music_info',
                            'film_info',
                            'abstract'
                        ])
                        .sort({ views: -1 })
                        .limit(1);
                }
            );
            let topView: Array<any> = await Promise.all(fullfill);
            const type = ['read', 'music', 'film', 'broadcast'];
            topView = topView.map((article: any, index: number) => {
                return Object.assign(article[0].toObject(), { type: type[index] });
            });
            return utils.json(0, 'get top view articles', topView);
        } catch (error) {
            console.log(error);
            return utils.json(-1, error.message);
        }
    }
}

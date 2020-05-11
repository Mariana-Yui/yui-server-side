import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class SearchService extends Service {
    public async getTypedArticles(ctx: Context, type: string, size: string, skip: string) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        const maps: Record<string, Model<any, {}>> = {
            read: ReadingArticle,
            music: MusicArticle,
            film: FilmArticle,
            broadcast: BroadcastArticle
        };
        try {
            const articles = await maps[type].find().skip(Number(skip));
            if (articles && articles.length > 0) {
                return utils.json(0, `get ${type} articles successfully`, {
                    articles: articles
                        .slice(0, Number(size))
                        .map((article: any) => article.toObject()),
                    ending: articles.slice(Number(size)).length === 0
                });
            }
            throw Error(`failed to get ${type} articles`);
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

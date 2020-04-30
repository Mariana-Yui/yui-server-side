import { Subscription } from 'egg';
import { Model } from 'mongoose';

export default class UpdateArticleStatus extends Subscription {
    static get schedule() {
        return {
            interval: '1h',
            type: 'worker'
        };
    }
    public async subscribe() {
        const now = new Date();
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = this.ctx.model
            .Article as any;
        const fullfill = [
            ReadingArticle,
            MusicArticle,
            FilmArticle,
            BroadcastArticle
        ].map((article: Model<any, {}>) => this.update(article, now));
        try {
            await Promise.all(fullfill);
            console.log('subscription has run');
        } catch (error) {
            console.log(error);
        }
    }

    public update(model: Model<any, {}>, date: Date) {
        const filter = {
            $and: [{ status: { $eq: 2 } }, { publish_time: { $lt: date } }]
        };
        // status: 2 审核完成, 4 发布中
        return model.find(filter).update({ status: 4 });
    }
}

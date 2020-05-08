import { Application } from 'egg';
import * as moment from 'moment';

export default (app: Application) => {
    const { Schema, model } = app.mongoose;
    const BroadcastArticleSchema = new Schema({
        title: { type: String, required: true },
        author_info: { type: Schema.Types.ObjectId, ref: 'Admin' },
        author: { type: String, required: true },
        abstract: { type: String }, // 书籍摘要
        content: { type: String, required: true },
        broadcast_url: { type: String, required: true }, // 音声文件
        comment: [{ type: Schema.Types.ObjectId, ref: 'BroadcastComment' }],
        status: { type: Number, default: 0 },
        is_top: { type: Boolean, default: false },
        enable: { type: Boolean, default: true },
        pre_release_time: { type: Date, default: Date.now },
        publish_time: { type: Date, default: Date.now },
        cover_img: { type: String, required: true },
        views: { type: Number, default: 0 },
        likes: { type: [{ type: Schema.Types.ObjectId, ref: 'Admin' }] },
        collects: { type: [{ type: Schema.Types.ObjectId, ref: 'Admin' }] }
    });

    BroadcastArticleSchema.virtual('create_time').get(function () {
        let create_time: Date | string = new Date(
            parseInt(String(this._id).substring(0, 8), 16) * 1000
        );
        create_time = moment(create_time).format('YYYY-MM-DD HH:mm:ss');
        return create_time;
    });
    BroadcastArticleSchema.path('publish_time').get(function (v: Date) {
        return moment(v).format('YYYY-MM-DD HH:mm:ss');
    });
    BroadcastArticleSchema.path('pre_release_time').get(function (v: Date) {
        return moment(v).format('YYYY-MM-DD HH:mm:ss');
    });
    BroadcastArticleSchema.set('toObject', { getters: true, virtuals: true });

    const BroadcastArticle = model('BroadcastArticle', BroadcastArticleSchema);

    return BroadcastArticle;
};

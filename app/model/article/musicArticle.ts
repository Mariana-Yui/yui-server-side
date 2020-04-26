import { Application } from 'egg';
import * as moment from 'moment';

export default (app: Application) => {
    const { Schema, model } = app.mongoose;
    const MusicArticleSchema = new Schema({
        title: { type: String, required: true },
        author_info: { type: Schema.Types.ObjectId, ref: 'Admin' },
        author: { type: String, required: true },
        abstract: { type: String }, // 书籍摘要
        music_info: {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            artists: { type: String },
            urls: { type: [{ type: String, required: true }] },
            cover: { type: String },
            album: { type: String }
        },
        content: { type: String, required: true },
        comment: [{ type: Schema.Types.ObjectId, ref: 'MusicComment' }],
        status: { type: Number, default: 0 },
        is_top: { type: Boolean, default: false },
        enable: { type: Boolean, default: true },
        pre_release_time: { type: Date, default: Date.now },
        publish_time: { type: Date, default: Date.now },
        cover_img: { type: String, required: true },
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        collects: { type: Number, default: 0 }
    });

    MusicArticleSchema.virtual('create_time').get(function () {
        let create_time: Date | string = new Date(
            parseInt(String(this._id).substring(0, 8), 16) * 1000
        );
        create_time = moment(create_time).format('YYYY-MM-DD HH:MM:SS');
        return create_time;
    });
    MusicArticleSchema.path('publish_time').get(function (v: Date) {
        return moment(v).format('YYYY-MM-DD HH:MM:SS');
    });
    MusicArticleSchema.path('pre_release_time').get(function (v: Date) {
        return moment(v).format('YYYY-MM-DD HH:MM:SS');
    });
    MusicArticleSchema.set('toObject', { getters: true, virtuals: true });

    const MusicArticle = model('MusicArticle', MusicArticleSchema);

    return MusicArticle;
};

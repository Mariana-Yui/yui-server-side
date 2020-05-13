import { Application } from 'egg';
import * as moment from 'moment';

export default (app: Application) => {
    const { Schema, model } = app.mongoose;
    const BroadcastCommentSchema = new Schema({
        article_id: { type: Schema.Types.ObjectId, ref: 'BroadcastArticle', required: true },
        user_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
        content: { type: String, required: true },
        is_top: { type: Boolean, default: false },
        enable: { type: Boolean, default: true },
        likes: [{ type: Schema.Types.ObjectId, ref: 'Admin' }],
        replay: [{ type: Schema.Types.ObjectId, ref: 'BroadcastComment' }]
    });

    BroadcastCommentSchema.virtual('create_time').get(function () {
        let create_time: Date | string = new Date(
            parseInt(String(this._id).substring(0, 8), 16) * 1000
        );
        create_time = moment(create_time).format('YYYY-MM-DD HH:MM:SS');
        return create_time;
    });

    BroadcastCommentSchema.set('toObject', { getters: true, virtuals: true });

    const BroadcastComment = model('BroadcastComment', BroadcastCommentSchema);

    return BroadcastComment;
};

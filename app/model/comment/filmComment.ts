import { Application } from 'egg';
import * as moment from 'moment';

export default (app: Application) => {
    const { Schema, model } = app.mongoose;
    const FilmCommentSchema = new Schema({
        article_id: { type: Schema.Types.ObjectId, ref: 'FilmArticle', required: true },
        user_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
        content: { type: String, required: true },
        is_top: { type: Boolean, default: false },
        enable: { type: Boolean, default: true },
        likes: { type: Number, default: 0 },
        replay: [{ type: Schema.Types.ObjectId, ref: 'FilmComment' }]
    });

    FilmCommentSchema.virtual('create_time').get(function () {
        let create_time: Date | string = new Date(
            parseInt(String(this._id).substring(0, 8), 16) * 1000
        );
        create_time = moment(create_time).format('YYYY-MM-DD HH:MM:SS');
        return create_time;
    });

    const FilmComment = model('FilmComment', FilmCommentSchema);

    return FilmComment;
};

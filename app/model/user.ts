import { Application } from 'egg';

export default (app: Application) => {
    const { Schema, model } = app.mongoose;
    const UserSchema = new Schema({
        user_id: { type: Schema.Types.ObjectId, ref: 'Admin' },
        // 上次登录信息
        last_ip: { type: String },
        last_ip_location: { type: String },
        last_login_time: { type: Date, default: Date.now },
        agent: { type: String },
        // 创作
        created: {
            read_article: { type: Schema.Types.ObjectId, ref: 'ReadingArticle' },
            film_article: { type: Schema.Types.ObjectId, ref: 'FilmArticle' },
            music_article: { type: Schema.Types.ObjectId, ref: 'MusicArticle' },
            broadcast_article: { type: Schema.Types.ObjectId, ref: 'BroadcastArticle' }
        },
        // 收藏, 不要命名collection
        collected: {
            read_article: { type: Schema.Types.ObjectId, ref: 'ReadingArticle' },
            film_article: { type: Schema.Types.ObjectId, ref: 'FilmArticle' },
            music_article: { type: Schema.Types.ObjectId, ref: 'MusicArticle' },
            broadcast_article: { type: Schema.Types.ObjectId, ref: 'BroadcastArticle' }
        },
        following: [{ type: Schema.Types.ObjectId, ref: 'Admin' }],
        followers: [{ type: Schema.Types.ObjectId, ref: 'Admin' }]
    });

    const User = model('User', UserSchema);
    return User;
};

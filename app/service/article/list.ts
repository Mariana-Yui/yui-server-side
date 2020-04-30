/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import { Service, Context } from 'egg';
import utils from '../../utils';

export default class ListService extends Service {
    public async getAllTypedArticle(ctx: Context, _id: string, type: string, filter?: any) {
        try {
            const { Admin } = ctx.model;
            const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
                .Article as any;
            const user = await Admin.findById(_id);
            if (user == null) {
                return utils.json(-1, '用户id不存在');
            }
            let articles;
            switch (type) {
                case 'read': {
                    articles =
                        user.role === 'admin'
                            ? await ReadingArticle.find(filter)
                            : await ReadingArticle.find({ author_info: _id, ...filter });
                    break;
                }
                case 'film': {
                    articles =
                        user.role === 'admin'
                            ? await FilmArticle.find(filter)
                            : await FilmArticle.find({ author_info: _id, ...filter });
                    break;
                }
                case 'music': {
                    articles =
                        user.role === 'admin'
                            ? await MusicArticle.find(filter)
                            : await MusicArticle.find({ author_info: _id, ...filter });
                    break;
                }
                case 'broadcast': {
                    articles =
                        user.role === 'admin'
                            ? await BroadcastArticle.find(filter)
                            : await BroadcastArticle.find({ author_info: _id, ...filter });
                }
            }
            // 返回的数据都要加toObject(), 否则返回的是未经处理的原始数据
            articles = (articles as Array<any>).map((article: any) => article.toObject());
            return utils.json(0, '搜索成功', articles);
        } catch (error) {
            console.log(error);
            return utils.json(-1, '查询文章列表失败');
        }
    }
    public async delTypedArticle(
        ctx: Context,
        article_id: string,
        author_id: string,
        type: string
    ) {
        try {
            const { Admin, User } = ctx.model;
            const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
                .Article as any;
            let userDetails;
            try {
                const admin = await Admin.findOne({ username: ctx.state.username });
                if (!(admin && (admin.role === 'admin' || admin._id === author_id))) {
                    throw Error('违规操作');
                }
                userDetails = await User.findOne({ _id: admin.details });
            } catch (error) {
                return utils.json(-1, error.message);
            }
            let article;
            switch (type) {
                case 'read': {
                    article = await ReadingArticle.findOneAndDelete({ _id: article_id });
                    const index = (userDetails.created.read_article as Array<string>).indexOf(
                        article_id
                    );
                    userDetails.created.read_article.splice(index, 1);
                    await userDetails.save();
                    break;
                }
                case 'music': {
                    article = await MusicArticle.findOneAndDelete({ _id: article_id });
                    const index = (userDetails.created.music_article as Array<string>).indexOf(
                        article_id
                    );
                    userDetails.created.music_article.splice(index, 1);
                    await userDetails.save();
                    break;
                }
                case 'film': {
                    article = await FilmArticle.findOneAndDelete({ _id: article_id });
                    const index = (userDetails.created.film_article as Array<string>).indexOf(
                        article_id
                    );
                    userDetails.created.film_article.splice(index, 1);
                    await userDetails.save();
                    break;
                }
                case 'broadcast': {
                    article = await BroadcastArticle.findOneAndDelete({ _id: article_id });
                    const index = (userDetails.created.broadcast_article as Array<string>).indexOf(
                        article_id
                    );
                    userDetails.created.broadcast_article.splice(index, 1);
                    await userDetails.save();
                }
            }
            if (article == null) {
                return utils.json(-1, '文章id不存在');
            }
            return utils.json(0, '删除文章成功');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
    public async toggleArticleStatus(
        ctx: Context,
        article_id: string,
        status: boolean,
        which: 'enable' | 'is_top',
        type: string
    ) {
        try {
            const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
                .Article as any;
            switch (type) {
                case 'read': {
                    await ReadingArticle.findOneAndUpdate(
                        { _id: article_id },
                        which === 'enable' ? { enable: status } : { is_top: status }
                    );
                    break;
                }
                case 'music': {
                    await MusicArticle.findOneAndUpdate(
                        { _id: article_id },
                        which === 'enable' ? { enable: status } : { is_top: status }
                    );
                    break;
                }
                case 'film': {
                    await FilmArticle.findOneAndUpdate(
                        { _id: article_id },
                        which === 'enable' ? { enable: status } : { is_top: status }
                    );
                    break;
                }
                case 'broadcast': {
                    await BroadcastArticle.findOneAndUpdate(
                        { _id: article_id },
                        which === 'enable' ? { enable: status } : { is_top: status }
                    );
                }
            }
            return utils.json(0, '状态修改成功');
        } catch (error) {
            console.log(error);
            return utils.json(-1, error.message);
        }
    }
    public async searchArticleByKeywords(
        ctx: Context,
        _id: string,
        keywords: string,
        type: string
    ) {
        try {
            const filter = {
                $or: [
                    { title: { $regex: keywords, $options: 'i' } },
                    { content: { $regex: keywords, $options: 'i' } }
                ]
            };
            if (keywords === '') {
                return this.getAllTypedArticle(ctx, _id, type);
            }
            return this.getAllTypedArticle(ctx, _id, type, filter);
        } catch (error) {
            console.log(error);
            return utils.json(-1, error.message);
        }
    }
    public async changeAuditStutus(ctx: Context, _id: string, status: number, type: string) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        try {
            let article;
            switch (type) {
                case 'read': {
                    article = await ReadingArticle.findOneAndUpdate({ _id }, { status });
                    break;
                }
                case 'music': {
                    article = await MusicArticle.findOneAndUpdate({ _id }, { status });
                    break;
                }
                case 'film': {
                    article = await FilmArticle.findOneAndUpdate({ _id }, { status });
                    break;
                }
                case 'broadcast': {
                    article = await BroadcastArticle.findOneAndUpdate({ _id }, { status });
                }
            }
            if (article != null) {
                return utils.json(0, '修改成功');
            }
            throw Error('修改失败');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

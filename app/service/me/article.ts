import { Service, Context } from 'egg';
import { Model } from 'mongoose';
import utils from '../../utils';

export default class ArticleService extends Service {
    public async getArticleContent(ctx: Context, id: string) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        try {
            const fullfill = [ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle].map(
                (Article: Model<any, {}>) => {
                    return Article.findById(id).populate([
                        {
                            path: 'author_info',
                            select: ['avatar', 'username', 'description'],
                            populate: {
                                path: 'details',
                                select: ['followers']
                            }
                        },
                        {
                            path: 'comment',
                            select: ['content', 'likes'],
                            populate: {
                                path: 'user_id',
                                select: ['avatar', 'username']
                            }
                        }
                    ]);
                }
            );
            let article = await Promise.all(fullfill);
            article = article.filter((a: any) => a);
            if (article && article.length) {
                return utils.json(0, 'get article content successfully', article[0].toObject());
            }
            throw Error('failed to get article content');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
    public async subscribeAuthorOrNot(ctx: Context, id: string, author_id: string) {
        const { Admin, User } = ctx.model;
        try {
            if (/removeSubscribeAuthor/.test(ctx.path)) {
                let user = await Admin.findById(id);
                let details = await User.findById(user.details);
                let index = (details.following as Array<string>).indexOf(author_id);
                if (index > -1) {
                    (details.following as Array<string>).splice(index, 1);
                    await details.save();
                }
                user = await Admin.findById(author_id);
                details = await User.findById(user.details);
                index = (details.followers as Array<string>).indexOf(id);
                if (index > -1) {
                    (details.followers as Array<string>).splice(index, 1);
                    await details.save();
                }
                return utils.json(0, '取消关注作者成功');
            }
            let user = await Admin.findById(id);
            let details = await User.findById(user.details);
            if (!(details.following as Array<string>).includes(author_id)) {
                (details.following as Array<string>).push(author_id);
                await details.save();
            }
            user = await Admin.findById(author_id);
            details = await User.findById(user.details);
            if (!(details.followers as Array<string>).includes(id)) {
                (details.followers as Array<string>).push(id);
                await details.save();
            }
            return utils.json(0, '关注作者成功');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
    public async addArticleViews(ctx: Context, id: string) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        try {
            const fullfill = [ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle].map(
                (Article: Model<any, {}>) => {
                    return Article.findById(id);
                }
            );
            const article = (await Promise.all(fullfill)).filter((art: null | any) => art);
            if (article && article.length) {
                article[0].views += 1;
                await article[0].save();
                return utils.json(0, 'views++');
            }
            throw Error('failed to views++');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
    public async publishComment(
        ctx: Context,
        id: string,
        article_id: string,
        comment: string,
        type: string
    ) {
        const { Admin } = ctx.model;
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        const { ReadingComment, MusicComment, FilmComment, BroadcastComment } = ctx.model
            .Comment as any;
        const article_maps = {
            read: ReadingArticle,
            music: MusicArticle,
            film: FilmArticle,
            broadcast: BroadcastArticle
        };
        const comment_maps = {
            read: ReadingComment,
            music: MusicComment,
            film: FilmComment,
            broadcast: BroadcastComment
        };
        try {
            const article = await (article_maps[type] as Model<any, {}>).findById(article_id);
            const _comment = await (comment_maps[type] as Model<any, {}>).create({
                article_id,
                user_id: id,
                content: comment
            });
            (article.comment as Array<string>).push(_comment._id);
            await article.save();
            const user = await Admin.findById(id, ['username', 'avatar']);
            return utils.json(0, 'publish comment successfully', {
                _id: _comment._id,
                content: comment,
                likes: [],
                user_id: user.toObject()
            });
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
    public async deleteComment(ctx: Context, comment_id: string, article_id: string, type: string) {
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        const { ReadingComment, MusicComment, FilmComment, BroadcastComment } = ctx.model
            .Comment as any;
        const article_maps: Record<string, Model<any, {}>> = {
            read: ReadingArticle,
            music: MusicArticle,
            film: FilmArticle,
            broadcast: BroadcastArticle
        };
        const comment_maps: Record<string, Model<any, {}>> = {
            read: ReadingComment,
            music: MusicComment,
            film: FilmComment,
            broadcast: BroadcastComment
        };
        try {
            const article = await article_maps[type].findById(article_id);
            const index = (article.comment as string[]).indexOf(comment_id);
            if (index > -1) {
                (article.comment as string[]).splice(index, 1);
                await article.save();
            }
            const comment = await comment_maps[type].findByIdAndRemove(comment_id);
            if (article && comment) {
                return utils.json(0, 'delete comment successfully');
            }
            throw Error('failed to delete comment');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
    public async likeCommentOrNot(ctx: Context, id: string, comment_id: string, type: string) {
        const { ReadingComment, MusicComment, FilmComment, BroadcastComment } = ctx.model
            .Comment as any;
        const comment_maps: Record<string, Model<any, {}>> = {
            read: ReadingComment,
            music: MusicComment,
            film: FilmComment,
            broadcast: BroadcastComment
        };
        try {
            if (/removeLikeComment/.test(ctx.path)) {
                const comment = await comment_maps[type].findById(comment_id);
                const index = (comment.likes as Array<string>).indexOf(id);
                if (index > -1) {
                    comment.likes.splice(index, 1);
                    await comment.save();
                }
            } else {
                const comment = await comment_maps[type].findById(comment_id);
                if (!(comment.likes as Array<string>).includes(id)) {
                    comment.likes.push(id);
                    await comment.save();
                }
            }
            return utils.json(0, 'like operation successfully');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

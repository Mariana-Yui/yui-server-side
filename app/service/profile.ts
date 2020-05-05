import { Service, Context } from 'egg';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import utils from '../utils';

export default class ProfileService extends Service {
    public async checkUserExist(ctx: Context, username: string) {
        const { Admin } = ctx.model;
        try {
            const user = await Admin.findOne({ username });
            // 不存在说明可用
            if (!user) {
                return utils.json(0, '可使用的用户名');
            }
            return utils.json(-1, '用户名已存在');
        } catch (error) {
            console.log(error);
            return utils.json(-1, '发生未知错误');
        }
    }
    public async updateProfile(ctx: Context, _id: string, info: Record<string, any>) {
        const { Admin } = ctx.model;
        try {
            const admin = await Admin.findOne({ _id });
            // 更新所有个人文章作者信息
            if (admin.username !== info.username) {
                await this.updateArticleAuthor(ctx, admin, info.username);
                console.log('updated !');
            }
            let updatedAdmin = await Admin.findOneAndUpdate({ _id }, info);
            updatedAdmin = _.omit(updatedAdmin.toObject(), ['password', '__v']); // toObject is necessary
            if (updatedAdmin) {
                return utils.json(0, '个人资料已更新', updatedAdmin);
            }
        } catch (error) {
            console.log(error);
        }
        return utils.json(-1, '发生未知错误');
    }
    private async updateArticleAuthor(ctx: Context, admin: any, username: string) {
        const { User } = ctx.model;
        const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
            .Article as any;
        const user = await User.findOne({ _id: admin.details });
        const {
            created: { read_article, music_article, film_article, broadcast_article }
        } = user.toObject();
        const article_id = [read_article, music_article, film_article, broadcast_article];
        const fullfill = [ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle].map(
            (Article: Model<any, {}>, index: number) => {
                return Article.find({ _id: { $in: article_id[index] } }).update({
                    author: username
                });
            }
        );
        await Promise.all(fullfill);
    }
    public async checkPassword(ctx: Context, username: string, password: string) {
        const { Admin } = ctx.model;
        try {
            const userInfo = await Admin.findOne({ username });
            if (userInfo) {
                if (password === userInfo.password) {
                    return utils.json(0, '密码正确');
                }
                return utils.json(-1, '密码错误');
            }
        } catch (error) {
            console.log(error);
        }
        return utils.json(-1, '发生未知错误');
    }
    public async updatePassword(ctx: Context, username: string, password: string) {
        const { Admin } = ctx.model;
        try {
            const userInfo = await Admin.findOneAndUpdate({ username }, { password });
            if (userInfo) {
                return utils.json(0, '密码修改成功');
            }
            return utils.json(-1, '修改密码失败');
        } catch (error) {
            console.log(error);
        }
        return utils.json(0, '发生未知错误');
    }
}

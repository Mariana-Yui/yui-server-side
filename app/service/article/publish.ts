import { Service, Context } from 'egg';
import utils from '../../utils';

export default class PublishService extends Service {
    public async getAllUsername(ctx: Context) {
        const { Admin } = ctx.model;
        try {
            const users = await Admin.find();
            const usernames = users.map((user: any) => user.username);
            return utils.json(0, '查找成功', { user: usernames });
        } catch (error) {
            console.log(error);
            return utils.json(-1, '查找失败');
        }
    }
    // public async saveArticle(ctx: Context, article: any, type: string, isDemo: boolean) {
    //     const { model } = ctx;
    //     const { title, author, cover, content } = article;
    //     try {
    //         //     switch (type) {
    //         //         case 'read': {
    //         //         }
    //         //         case 'music': {
    //         //         }
    //         //         case 'film': {
    //         //         }
    //         //         case 'broadcast': {
    //         //         }
    //         //         default: {
    //         //         }
    //         //     }
    //     } catch (error) {
    //         console.log(error);
    //         return utils.json(-1, '保存文章失败, 请重试');
    //     }
    // }
}

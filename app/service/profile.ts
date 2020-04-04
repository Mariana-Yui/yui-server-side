import { Service, Context } from 'egg';
import * as _ from 'lodash';
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
    public async updateProfile(ctx: Context, username: string, info: Record<string, any>) {
        const { Admin } = ctx.model;
        try {
            let updatedAdmin = await Admin.findOneAndUpdate({ username }, info);
            updatedAdmin = _.omit(updatedAdmin.toObject(), ['password', '__v']); // toObject is necessary
            if (updatedAdmin) {
                return utils.json(0, '个人资料已更新', updatedAdmin);
            }
        } catch (error) {
            console.log(error);
        }
        return utils.json(-1, '发生未知错误');
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
}

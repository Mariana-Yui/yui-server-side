import { Service, Context } from 'egg';
import * as _ from 'lodash';
import utils from '../../utils';

export default class AdminService extends Service {
    public async getAdminList(ctx: Context, size: number, page: number) {
        const { Admin } = ctx.model;
        try {
            let users = await Admin.find()
                .skip(size * (page - 1))
                .limit(size)
                .sort({
                    role: 'asc'
                });
            users = users.map((user: any) => {
                return _.omit(user.toObject(), ['token', 'password', '__v']);
            });
            return utils.json(0, '查找成功', users);
        } catch (error) {
            console.log(error.message);
            return utils.json(-1, error.message);
        }
    }
    public async getTotalNumber(ctx: Context) {
        const { Admin } = ctx.model;
        try {
            const total = await (await Admin.find()).length;
            return utils.json(0, '查找成功', { total });
        } catch (error) {
            console.log(error.message);
            return utils.json(-1, error.message);
        }
    }
    public async toggleStatus(ctx: Context, admin: string, username: string, enable: string) {
        const { Admin } = ctx.model;
        try {
            const hasPermission = await Admin.findOne({ username: admin });
            if (hasPermission.role !== 'admin') {
                return utils.json(-1, '非管理员操作');
            }
            const en = /true/.test(enable);
            const updated = await Admin.findOneAndUpdate({ username }, { enable: en });
            return utils.json(0, '用户状态修改成功', updated);
        } catch (error) {
            console.log(error);
            return utils.json(-1, '修改失败');
        }
    }
}

import { Service, Context } from 'egg';
import * as _ from 'lodash';
import utils from '../../utils';

export default class DetailService extends Service {
    public async getAllUserDetails(ctx: Context, size: number, page: number, filter?: any) {
        const { Admin } = ctx.model;
        try {
            let users = await Admin.find(filter)
                .skip(size * (page - 1))
                .limit(size)
                .populate('details');
            users = users.map((user: any) => {
                user.details = user.details.toObject();
                return _.omit(user.toObject(), ['token', 'password', '__v']);
            });
            return utils.json(0, '获取成功', users);
        } catch (error) {
            console.log(error);
            return utils.json(-1, '获取失败');
        }
    }

    public async getUserDetailsByKeywords(
        ctx: Context,
        size: number,
        page: number,
        keywords: string
    ) {
        const filter = {
            $or: [
                { username: { $regex: keywords, $options: 'i' } },
                { phone: { $regex: keywords, $options: 'i' } },
                { email: { $regex: keywords, $options: 'i' } }
            ]
        };
        try {
            if (keywords === '') {
                return await this.getAllUserDetails(ctx, size, page);
            }
            return await this.getAllUserDetails(ctx, size, page, filter);
        } catch (error) {
            console.log(error);
        }
    }
}

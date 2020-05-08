import { Service, Context } from 'egg';
import * as jwt from 'jsonwebtoken';
import utils from '../../utils/index';

export default class LoginService extends Service {
    public async testToken(ctx: Context, email?: string, password?: string) {
        const { username } = ctx.state;
        const { Admin } = ctx.model;
        try {
            if (username) {
                const token = await Admin.findOne({ username });
                if (token) {
                    return utils.json(0, '验证通过');
                }
            } else {
                // 初次登录, 验证用户名/密码
                const admin = await Admin.findOne({ email });
                if (admin) {
                    if (password === admin.password) {
                        const token = jwt.sign(
                            { username: admin.username },
                            ctx.app.config.jwt_key,
                            {
                                expiresIn: ctx.app.config.expired
                            }
                        );
                        // 存储token, new要设为true才会返回新的数据, 否则默认返回旧数据
                        const updatedAdmin = await Admin.findOneAndUpdate(
                            { email },
                            { token },
                            { new: true, select: '_id token' }
                        ); // query update
                        return utils.json(0, '验证通过', updatedAdmin);
                    }
                    return utils.json(-1, '密码错误');
                }
                return utils.json(-1, '用户名不存在');
            }
        } catch (error) {
            console.error(error);
        }
    }
}

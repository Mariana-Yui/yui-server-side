import { Service, Context } from 'egg';
import { create, createMathExpr } from 'svg-captcha';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import utils from '../utils';
let curNum = 0;

export default class LoginService extends Service {
    public async getCaptcha() {
        const { captchaParams } = this.config;
        const random = Math.floor(Math.random() * 2); // [0,1]
        const func = [create, createMathExpr];
        const res = func[random](captchaParams);
        return res;
    }
    public async getLoginBg() {
        const imgPath = path.join(__dirname, '../public/background');
        try {
            const files = await promisify(fs.readdir)(imgPath);
            if (files.length > 0) {
                if (curNum >= files.length) curNum = 0;
                const img = await promisify(fs.readFile)(path.join(imgPath, `${files[curNum]}`));
                curNum++;
                return img;
            }
            console.log('this directory has no images');
        } catch (error) {
            console.error(error);
        }
    }
    public async testToken(ctx: Context) {
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
                const { username, password } = ctx.request.body;
                const admin = await Admin.findOne({ username });
                if (admin) {
                    if (password === admin.password) {
                        const token = jwt.sign({ username }, ctx.app.config.jwt_key, {
                            expiresIn: '1h'
                        });
                        // 存储token, new要设为true才会返回新的数据, 否则默认返回旧数据
                        let updatedAdmin = await Admin.findOneAndUpdate(
                            { username },
                            { token },
                            { new: true }
                        ); // query update
                        updatedAdmin = _.omit(updatedAdmin.toObject(), ['password', '__v']); // toObject is necessary
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

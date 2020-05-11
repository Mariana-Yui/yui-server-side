import { Service, Context } from 'egg';
import * as nodemailer from 'nodemailer';
import utils from '../../utils';

export default class RegisterService extends Service {
    public async checkUsableEmail(ctx: Context, email: string) {
        const { Admin } = ctx.model;
        try {
            const admin = await Admin.find({ email });
            if (admin && admin.length > 0) {
                return utils.json(-1, '该邮箱已被注册');
            }
            await this.generateCode(ctx, email);
            return utils.json(0, `验证码已发送成功,有效期${ctx.app.config.email.expired}分钟`);
        } catch (error) {
            console.log(error);
            return utils.json(-1, error.message);
        }
    }
    private async generateCode(ctx: Context, _email: string) {
        const { email } = ctx.app.config;
        const expired = await ctx.app.redis.hget(`nodemailer:${_email}`, 'expired');
        if (expired && Date.now() < Number(expired)) {
            ctx.body = utils.json(0, '验证码在有效期内');
            return;
        }
        const transporter = nodemailer.createTransport({
            host: email.host,
            port: email.port,
            secure: false,
            auth: {
                user: email.account.user,
                pass: email.account.pass
            }
        });
        // 发送邮件
        const code = email.random();
        // from包含的邮箱必须与auth.user相同
        const mailOptions = {
            from: `"Mariana Yui👻" <${email.account.user}>`,
            to: _email,
            subject: '欢迎注册Yui的毕业设计读书APP ✔',
            text: `您的注册验证码如下,有效期为 ${email.expired} 分钟`,
            html: `<div>您的注册验证码如下,有效期为 ${email.expired} 分钟</div><b>${code}</b>`
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        // code写入缓存
        await ctx.app.redis.hmset(
            `nodemailer:${_email}`,
            'code',
            code,
            'expired',
            Date.now() + 1000 * 60 * email.expired
        );
    }
    public async checkUsableUserInfo(
        ctx: Context,
        code: string,
        email: string,
        username: string,
        password
    ) {
        const { Admin, User } = ctx.model;
        try {
            const redisUser = await ctx.app.redis.hgetall(`nodemailer:${email}`);
            if (redisUser && redisUser.expired && Date.now() < Number(redisUser.expired)) {
                if (redisUser.code === code) {
                    const admin = await Admin.find({ username });
                    if (admin && admin.length > 0) {
                        return utils.json(-1, '用户名已存在');
                    }
                    const user = await Admin.create({ username, password, email });
                    const details = await User.create({});
                    user.details = details._id;
                    await user.save();
                    return utils.json(0, '新用户注册成功');
                }
                return utils.json(-1, '验证码不正确');
            }
            return utils.json(-2, '验证码已过期,请重新获取');
        } catch (error) {}
    }
}

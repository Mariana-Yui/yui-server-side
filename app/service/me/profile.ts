import { Service, Context } from 'egg';
import utils from '../../utils';

export default class ProfileService extends Service {
    public async getUserInfo(ctx: Context, _id: string) {
        const { Admin } = ctx.model;
        try {
            const user = await Admin.findById(_id, [
                'avatar',
                'username',
                'description',
                'background',
                'email',
                'phone'
            ]);
            if (user != null) {
                return utils.json(0, 'get user profile', user);
            }
            // eslint-disable-next-line quotes
            throw Error("can't get user profile");
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

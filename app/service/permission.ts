import { Service, Context } from 'egg';
import utils from '../utils';

export default class PermissionService extends Service {
    public async getUserRole(ctx: Context, username: string) {
        const { Admin } = ctx.model;
        try {
            const user = await Admin.findOne({ username });
            return utils.json(0, '成功', { role: user.role });
        } catch (error) {
            return utils.json(-1, '失败');
        }
    }
}

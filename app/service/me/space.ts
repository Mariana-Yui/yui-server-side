import { Service, Context } from 'egg';
import utils from '../../utils';

export default class SpaceService extends Service {
    public async getUserDetails(ctx: Context, _id: string) {
        const { Admin } = ctx.model;
        try {
            // deep-populate
            const user = await Admin.findOne({ _id }, [
                'username',
                'avatar',
                'description',
                'background'
            ]).populate([
                {
                    path: 'details',
                    select: ['following', 'followers', 'created'],
                    populate: [
                        {
                            path: 'created.read_article',
                            select: ['cover_img', '_id', 'title', 'author', 'publish_time', 'likes']
                        },
                        {
                            path: 'created.music_article',
                            select: ['cover_img', '_id', 'title', 'author', 'publish_time', 'likes']
                        },
                        {
                            path: 'created.film_article',
                            select: ['cover_img', '_id', 'title', 'author', 'publish_time', 'likes']
                        },
                        {
                            path: 'created.broadcast_article',
                            select: ['cover_img', '_id', 'title', 'author', 'publish_time', 'likes']
                        }
                    ]
                }
            ]);
            if (user != null) {
                return utils.json(0, 'get user details', user.toObject());
            }
            throw Error('获取信息失败');
        } catch (error) {
            console.log(error.message);
            return utils.json(-1, error.message);
        }
    }
    public async checkSubscribe(ctx: Context, id: string, following: string) {
        const { Admin } = await ctx.model;
        try {
            const user = await Admin.findById(id).populate({
                path: 'details'
            });
            if (
                user.details.following &&
                (user.details.following as Array<string>).includes(following)
            ) {
                return utils.json(0, 'following user');
            }
            throw Error('stranger');
        } catch (error) {
            return utils.json(-1, error.message);
        }
    }
}

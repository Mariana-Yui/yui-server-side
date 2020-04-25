/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import { Service, Context } from 'egg';
import utils from '../../utils';

export default class ListService extends Service {
    public async getAllTypedArticle(ctx: Context, _id: string, type: string) {
        try {
            const { Admin } = ctx.model;
            const { ReadingArticle, MusicArticle, FilmArticle, BroadcastArticle } = ctx.model
                .Article as any;
            const user = await Admin.findById(_id);
            if (user == null) {
                return utils.json(-1, '用户id不存在');
            }
            let articles;
            switch (type) {
                case 'read': {
                    articles =
                        user.role === 'admin'
                            ? await ReadingArticle.find()
                            : await ReadingArticle.find({ author_info: _id }).populate(
                                  'author_info'
                              );
                    break;
                }
                case 'film': {
                    articles =
                        user.role === 'admin'
                            ? await FilmArticle.find()
                            : await FilmArticle.find({ author_info: _id }).populate('author_info');
                    break;
                }
                case 'music': {
                    articles =
                        user.role === 'admin'
                            ? await MusicArticle.find()
                            : await MusicArticle.find({ author_info: _id }).populate('author_info');
                    break;
                }
                case 'broadcast': {
                    articles =
                        user.role === 'admin'
                            ? await BroadcastArticle.find()
                            : await BroadcastArticle.find({ author_info: _id }).populate(
                                  'author_info'
                              );
                }
            }
            // 返回的数据都要加toObject(), 否则返回的是未经处理的原始数据
            articles = (articles as Array<any>).map((article: any) => article.toObject());
            return utils.json(0, '搜索成功', articles);
        } catch (error) {
            console.log(error);
            return utils.json(-1, '查询文章列表失败');
        }
    }
}

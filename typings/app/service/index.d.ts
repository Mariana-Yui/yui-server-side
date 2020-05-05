// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportLogin from '../../../app/service/login';
import ExportPermission from '../../../app/service/permission';
import ExportProfile from '../../../app/service/profile';
import ExportQiniu from '../../../app/service/qiniu';
import ExportAllBanner from '../../../app/service/all/banner';
import ExportAllTopview from '../../../app/service/all/topview';
import ExportArticleList from '../../../app/service/article/list';
import ExportArticleMusic from '../../../app/service/article/music';
import ExportArticlePublish from '../../../app/service/article/publish';
import ExportUserAdmin from '../../../app/service/user/admin';
import ExportUserDetail from '../../../app/service/user/detail';
import ExportYuiArticle from '../../../app/service/yui/article';

declare module 'egg' {
  interface IService {
    login: AutoInstanceType<typeof ExportLogin>;
    permission: AutoInstanceType<typeof ExportPermission>;
    profile: AutoInstanceType<typeof ExportProfile>;
    qiniu: AutoInstanceType<typeof ExportQiniu>;
    all: {
      banner: AutoInstanceType<typeof ExportAllBanner>;
      topview: AutoInstanceType<typeof ExportAllTopview>;
    }
    article: {
      list: AutoInstanceType<typeof ExportArticleList>;
      music: AutoInstanceType<typeof ExportArticleMusic>;
      publish: AutoInstanceType<typeof ExportArticlePublish>;
    }
    user: {
      admin: AutoInstanceType<typeof ExportUserAdmin>;
      detail: AutoInstanceType<typeof ExportUserDetail>;
    }
    yui: {
      article: AutoInstanceType<typeof ExportYuiArticle>;
    }
  }
}

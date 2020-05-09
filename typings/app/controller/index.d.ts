// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLogin from '../../../app/controller/login';
import ExportPermission from '../../../app/controller/permission';
import ExportProfile from '../../../app/controller/profile';
import ExportQiniu from '../../../app/controller/qiniu';
import ExportAllBanner from '../../../app/controller/all/banner';
import ExportAllTopview from '../../../app/controller/all/topview';
import ExportArticleList from '../../../app/controller/article/list';
import ExportArticleMusic from '../../../app/controller/article/music';
import ExportArticlePublish from '../../../app/controller/article/publish';
import ExportMeCollection from '../../../app/controller/me/collection';
import ExportMeLogin from '../../../app/controller/me/login';
import ExportMeProfile from '../../../app/controller/me/profile';
import ExportMeSpace from '../../../app/controller/me/space';
import ExportUserAdmin from '../../../app/controller/user/admin';
import ExportUserDetail from '../../../app/controller/user/detail';
import ExportYuiRecommend from '../../../app/controller/yui/recommend';

declare module 'egg' {
  interface IController {
    login: ExportLogin;
    permission: ExportPermission;
    profile: ExportProfile;
    qiniu: ExportQiniu;
    all: {
      banner: ExportAllBanner;
      topview: ExportAllTopview;
    }
    article: {
      list: ExportArticleList;
      music: ExportArticleMusic;
      publish: ExportArticlePublish;
    }
    me: {
      collection: ExportMeCollection;
      login: ExportMeLogin;
      profile: ExportMeProfile;
      space: ExportMeSpace;
    }
    user: {
      admin: ExportUserAdmin;
      detail: ExportUserDetail;
    }
    yui: {
      recommend: ExportYuiRecommend;
    }
  }
}

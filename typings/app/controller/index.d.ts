// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLogin from '../../../app/controller/login';
import ExportPermission from '../../../app/controller/permission';
import ExportProfile from '../../../app/controller/profile';
import ExportQiniu from '../../../app/controller/qiniu';
import ExportAllBanner from '../../../app/controller/all/banner';
import ExportArticleList from '../../../app/controller/article/list';
import ExportArticleMusic from '../../../app/controller/article/music';
import ExportArticlePublish from '../../../app/controller/article/publish';
import ExportUserAdmin from '../../../app/controller/user/admin';
import ExportUserDetail from '../../../app/controller/user/detail';

declare module 'egg' {
  interface IController {
    login: ExportLogin;
    permission: ExportPermission;
    profile: ExportProfile;
    qiniu: ExportQiniu;
    all: {
      banner: ExportAllBanner;
    }
    article: {
      list: ExportArticleList;
      music: ExportArticleMusic;
      publish: ExportArticlePublish;
    }
    user: {
      admin: ExportUserAdmin;
      detail: ExportUserDetail;
    }
  }
}

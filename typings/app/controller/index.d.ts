// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLogin from '../../../app/controller/login';
import ExportPermission from '../../../app/controller/permission';
import ExportProfile from '../../../app/controller/profile';
import ExportQiniu from '../../../app/controller/qiniu';
import ExportArticlePublish from '../../../app/controller/article/publish';
import ExportUserAdmin from '../../../app/controller/user/admin';

declare module 'egg' {
  interface IController {
    login: ExportLogin;
    permission: ExportPermission;
    profile: ExportProfile;
    qiniu: ExportQiniu;
    article: {
      publish: ExportArticlePublish;
    }
    user: {
      admin: ExportUserAdmin;
    }
  }
}

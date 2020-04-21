import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/admin/getCaptcha', controller.login.getCaptcha);
    router.get('/admin/getLoginBg', controller.login.getLoginBg);
    router.post('/admin/login', controller.login.testToken);
    router.get('/profile/checkUsername', controller.profile.checkUserExist);
    router.post('/profile/updateProfile', controller.profile.updateProfile);
    router.post('/profile/checkPassword', controller.profile.checkPassword);
    router.post('/profile/updatePassword', controller.profile.updatePassword);
    router.get('/qiniu/getUpToken', controller.qiniu.getUpToken);
    router.get('/user/admin/getlist', controller.user.admin.getAdminList);
    router.get('/user/admin/gettotal', controller.user.admin.getTotalNumber);
    router.get('/user/admin/togglestatus', controller.user.admin.toggleStatus);
    router.get('/user/admin/getadminbykeywords', controller.user.admin.getAdminByKeywords);
    router.post('/user/admin/createnewadmin', controller.user.admin.createNewAdmin);
    router.get('/article/publish/getallusername', controller.article.publish.getAllUsername);
    // router.all(/\/article\/music\/.*/, middleware.music);
    router.get(
        '/article/music/searchMusicBykeywords',
        controller.article.music.searchMusicByKeywords
    );
};

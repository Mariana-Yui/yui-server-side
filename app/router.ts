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
    router.get(
        '/user/detail/getUserDetailsByKeywords',
        controller.user.detail.getUserDetailsByKeywords
    );
    router.get('/article/publish/getallusername', controller.article.publish.getAllUsername);
    router.post('/article/publish/savearticle', controller.article.publish.saveArticle);
    router.get('/article/publish/getArticleInfo', controller.article.publish.getArticleInfo);
    // router.all(/\/article\/music\/.*/, middleware.music);
    router.get(
        '/article/music/searchMusicBykeywords',
        controller.article.music.searchMusicByKeywords
    );
    router.get(
        '/article/music/getMusicByDefaultkeywords',
        controller.article.music.getMusicByDefaultKeywords
    );
    router.get('/article/music/getSpecificSongurls', controller.article.music.getSpecificSongUrls);
    // router.get('/article/list/getAllTypedArticle', controller.article.list.getAllTypedArticle);
    router.get(
        '/article/list/searchArticleByKeywords',
        controller.article.list.searchArticleByKeywords
    );
    router.post('/article/list/delTypedArticle', controller.article.list.delTypedArticle);
    router.post('/article/list/toggleArticleStatus', controller.article.list.toggleArticleStatus);
    router.post('/article/list/changeAuditStutus', controller.article.list.changeAuditStutus);

    /* app */
    router.post('/app/me/loginStatus', controller.login.testToken);
    router.get('/app/all/getBannerInfo', controller.all.banner.getBannerInfo);
};

import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/admin/getCaptcha', controller.login.getCaptcha);
    router.get('/admin/getLoginBg', controller.login.getLoginBg);
    router.post('/admin/login', controller.login.testToken);
    router.get('/profile/checkUsername', controller.profile.checkUserExist);
    router.post('/profile/updateProfile', controller.profile.updateProfile);
    router.post('/profile/c heckPassword', controller.profile.checkPassword);
    router.post('/profile/updatePas sword', controller.profile.updatePassword);
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
    router.get('/app/me/music/getNetEaseVIPCookie', controller.me.music.getNetEaseVIPCookie);
    router.get('/app/me/music/getNewMusicUrl', controller.article.music.getSpecificSongUrls);
    router.post('/app/me/music/updateMusicUrls', controller.me.music.updateMusicUrls);
    router.get('/app/all/getBannerInfo', controller.all.banner.getBannerInfo);
    router.get('/app/all/getTopViewArticles', controller.all.topview.getTopViewArticles);
    router.post('/app/yui/getArticleRegular', controller.yui.recommend.getArticleRegular);
    router.post('/app/yui/getLatestArticle', controller.yui.recommend.getLatestArticle);
    router.post('/app/me/login', controller.me.login.testToken);
    router.post('/app/space/getUserDetails', controller.me.space.getUserDetails);
    router.get('/app/space/checkSubscribe', controller.me.space.checkSubscribe);
    router.post(
        '/app/collection/getTypedArticleCollection',
        controller.me.collection.getTypedArticleCollection
    );
    router.post('/app/collection/collectArticle', controller.me.collection.collectArticleOrNot);
    router.post(
        '/app/collection/removeCollectArticle',
        controller.me.collection.collectArticleOrNot
    );
    router.post('/app/me/profile/getUserInfo', controller.me.profile.getUserProfile);
    router.post('/app/me/profile/updateUserInfo', controller.profile.updateProfile);
    router.post('/app/me/profile/checkPassword', controller.profile.checkPassword);
    router.post('/app/me/profile/updatePassword', controller.profile.updatePassword);
    router.post('/app/me/likeArticle', controller.me.like.likeArticleOrNot);
    router.post('/app/me/removeLikeArticle', controller.me.like.likeArticleOrNot);
    router.post('/app/me/register/checkUsableEmail', controller.me.register.checkUsableEmail);
    router.post('/app/me/register/checkUsableUserInfo', controller.me.register.checkUsableUserInfo);
    router.post('/app/me/search/getTypedArticles', controller.me.search.getTypedArticles);
};

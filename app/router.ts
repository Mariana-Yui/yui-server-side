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
};

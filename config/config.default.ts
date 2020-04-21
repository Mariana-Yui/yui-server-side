import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_marianaYui';

    // add your egg config in here
    config.middleware = ['log', 'jwt'];

    // 验证码配置
    const captchaParams = {
        size: 4,
        ingoreChars: '0Oo',
        noise: 2,
        color: true,
        background: '#cc9966',
        width: 82,
        height: 41
    };
    // 跨域设置
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        allowHeaders: '*'
    };
    // 关闭csrf校检
    config.security = {
        csrf: {
            enable: false
        }
    };
    // alinode
    config.alinode = {
        appid: '84503',
        secret: '9eb7beb3b261a7771158a065745f5de2f1ba6b23'
    };
    // 背景图片
    const bg = {
        length: 15
    };
    // jwt serectKey
    const jwt_key = 'diygod';
    // 七牛云图床相关配置
    const qiniu = {
        ACCESS_KEY: 'MAjrtFSs6xzKftALyS9gdeTdWEUdg-zhjVKAdY5M',
        SECRET_KEY: 'iFdLkSk9lGryNXlFdXy4VTC49IrrYUO0ro45arBC',
        options: {
            scope: 'yui-graduation-project',
            returnBody:
                '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
            expires: 3600
        },
        domain: 'http://q7lp77n6c.bkt.clouddn.com'
    };

    return {
        ...config,
        captchaParams,
        bg,
        jwt_key,
        qiniu
    };
};

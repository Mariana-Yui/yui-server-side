import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_marianaYui'

    // add your egg config in here
    config.middleware = ['log', 'jwt']

    // 验证码配置
    const captchaParams = {
        size: 4,
        ingoreChars: '0Oo',
        noise: 2,
        color: true,
        background: '#cc9966',
        width: 82,
        height: 41
    }
    // 跨域设置
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        allowHeaders: '*'
    }
    // 关闭csrf校检
    config.security = {
        csrf: {
            enable: false
        }
    }
    // 背景图片
    const bg = {
        length: 15
    }
    // jwt serectKey
    const jwt_key = 'diygod'

    return {
        ...config,
        captchaParams,
        bg,
        jwt_key
    }
}

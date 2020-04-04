import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    config.mongoose = {
        url: 'mongodb://127.0.0.1/yui',
        options: {
            useFindAndModify: false
        }
    };
    // 默认admin头像
    config.avatar = 'http://q7lp77n6c.bkt.clouddn.com/default/60-002.jpg';
    // 默认个性签名
    config.description = '1970 years, she never woke up.';

    return config;
};

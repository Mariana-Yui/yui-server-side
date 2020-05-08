import { EggAppConfig, PowerPartial } from 'egg';
import * as path from 'path';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    config.mongoose = {
        url: 'mongodb://127.0.0.1/yui',
        options: {
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    };
    config.redis = {
        client: {
            port: 6379, // Redis port
            host: '127.0.0.1', // Redis host
            password: '199847',
            db: 0
        }
    };
    // 默认admin头像
    config.avatar = 'http://q95bvp3v9.bkt.clouddn.com/2020/04/22/c83ef44d49e5680*80.jpg';
    // 默认admin背景
    config.background = 'http://q95bvp3v9.bkt.clouddn.com/wallhaven-6k3oox.jpg';
    // 默认个性签名
    config.description = '1970 years, she never woke up.';
    // logger path
    config.logger = {
        dir: path.join(__dirname, '../logs/yui-server-side/')
    };

    return config;
};

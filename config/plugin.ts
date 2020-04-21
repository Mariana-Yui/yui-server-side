import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    cors: {
        enable: true,
        package: 'egg-cors'
    },
    mongoose: {
        enable: true,
        package: 'egg-mongoose'
    },
    alinode: {
        enable: true,
        package: 'egg-alinode'
    }
};

export default plugin;

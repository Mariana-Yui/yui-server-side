import { Service } from 'egg';
import * as qiniu from 'qiniu';

export default class QiniuService extends Service {
    public async getUpToken() {
        const { ACCESS_KEY: accessKey, SECRET_KEY: secretKey, options, domain } = this.config.qiniu;
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const upToken = putPolicy.uploadToken(mac);
        return {
            domain,
            upToken
        };
    }
}

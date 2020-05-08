import { Application } from 'egg';
import * as moment from 'moment';

export default (app: Application) => {
    const { Schema, model } = app.mongoose;
    const AdminSchema = new Schema({
        token: { type: String },
        username: { type: String },
        password: { type: String },
        email: { type: String },
        phone: { type: String },
        avatar: { type: String, default: app.config.avatar },
        background: { type: String, default: app.config.background },
        description: { type: String, default: app.config.description },
        role: { type: String, enum: ['admin', 'author'], default: 'admin' },
        role_name: { type: String, enum: ['管理员', '用户'], default: '管理员' },
        enable: { type: Boolean, default: true },
        details: { type: Schema.Types.ObjectId, ref: 'User' }
    });

    AdminSchema.virtual('create_time').get(function () {
        let create_time: Date | string = new Date(
            parseInt(String(this._id).substring(0, 8), 16) * 1000
        );
        create_time = moment(create_time).format('YYYY-MM-DD HH:MM:SS');
        return create_time;
    });
    AdminSchema.set('toObject', { getters: true, virtuals: true });

    const Admin = model('Admin', AdminSchema);

    return Admin;
};

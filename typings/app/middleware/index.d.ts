// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwt from '../../../app/middleware/jwt';
import ExportLog from '../../../app/middleware/log';
import ExportMusic from '../../../app/middleware/music';

declare module 'egg' {
  interface IMiddleware {
    jwt: typeof ExportJwt;
    log: typeof ExportLog;
    music: typeof ExportMusic;
  }
}

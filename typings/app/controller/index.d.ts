// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLogin from '../../../app/controller/login';
import ExportProfile from '../../../app/controller/profile';

declare module 'egg' {
  interface IController {
    login: ExportLogin;
    profile: ExportProfile;
  }
}

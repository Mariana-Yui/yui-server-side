// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/model/admin';
import ExportUser from '../../../app/model/user';
import ExportArticleBroadcastArticle from '../../../app/model/article/broadcastArticle';
import ExportArticleFilmArticle from '../../../app/model/article/filmArticle';
import ExportArticleMusicArticle from '../../../app/model/article/musicArticle';
import ExportArticleReadingArticle from '../../../app/model/article/readingArticle';
import ExportCommentBroadcastComment from '../../../app/model/comment/broadcastComment';
import ExportCommentFilmComment from '../../../app/model/comment/filmComment';
import ExportCommentMusicComment from '../../../app/model/comment/musicComment';
import ExportCommentReadingComment from '../../../app/model/comment/readingComment';

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    User: ReturnType<typeof ExportUser>;
    Article: {
      BroadcastArticle: ReturnType<typeof ExportArticleBroadcastArticle>;
      FilmArticle: ReturnType<typeof ExportArticleFilmArticle>;
      MusicArticle: ReturnType<typeof ExportArticleMusicArticle>;
      ReadingArticle: ReturnType<typeof ExportArticleReadingArticle>;
    }
    Comment: {
      BroadcastComment: ReturnType<typeof ExportCommentBroadcastComment>;
      FilmComment: ReturnType<typeof ExportCommentFilmComment>;
      MusicComment: ReturnType<typeof ExportCommentMusicComment>;
      ReadingComment: ReturnType<typeof ExportCommentReadingComment>;
    }
  }
}

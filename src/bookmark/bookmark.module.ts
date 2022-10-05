import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmap.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}

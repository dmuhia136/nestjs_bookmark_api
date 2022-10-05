import { Controller, Get } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

@Controller('book')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get('all')
  fetchAll() {
    return this.bookmarkService.getAll();
  }
}

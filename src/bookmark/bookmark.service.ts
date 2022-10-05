import { Injectable } from "@nestjs/common";

@Injectable()
export class BookmarkService{
    getAll(){
        return {book: "Number one",book1: "Number one"}
    }
}
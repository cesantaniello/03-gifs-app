import { Gif } from "../interfaces/gif.interface";

export class GifMapper {
  static mapGiphyItemToGif(idem: any): Gif {
    return {
      id: idem.id,
      title: idem.title,
      url: idem.images.original.url
    };
  }


    static mapGiphyItemToGifArray(items: any): Gif {
      return items.map((item: any) => this.mapGiphyItemToGif);
}}

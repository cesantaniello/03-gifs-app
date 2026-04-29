import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
    console.log('Servicio creado');
  }

loadTrendingGifs() {
  return this.http
    .get<GiphyResponse>(`${environment.giphyUrl}gifs/trending`, {  // ← sin la / inicial
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      },
    })
    .subscribe((response) => {
      const gifs: Gif[] = GifMapper.mapGiphyItemToGifArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });
}
}

import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';


const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  trendingGifGroup = computed(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });


  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

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
  searchGifs(query: string):Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}gifs/search`, {  // ← sin la / inicial
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        },
      }).pipe(
        map(({data}) => data),
        map((giphyItems) => GifMapper.mapGiphyItemToGifArray(giphyItems)),

        //TODO Historial
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLocaleLowerCase()]: items
          }));
        })
      );
      /*
    .subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemToGifArray(response.data);
    });*/
  }

    getHistoryGifs(query: string): Gif[] {
      return this.searchHistory()[query] ?? [];
    }

}

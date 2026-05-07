import { Component, inject } from '@angular/core';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {
  gifService = inject(GifService);
  gifs = this.gifService.trendingGifs;  // ← usa el signal del servicio
}

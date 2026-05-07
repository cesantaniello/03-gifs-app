import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.html',
})
export default class TrendingPage {
  gifService = inject(GifService);
  scrollDivRef = viewChild<ElementRef>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
  }
}

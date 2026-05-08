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
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    console.log({ scrollTotal: scrollTop + clientHeight, scrollHeight });

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    console.log({ isAtBottom });
  }
}

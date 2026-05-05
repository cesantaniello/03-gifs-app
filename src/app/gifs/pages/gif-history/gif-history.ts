import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.html',
})
export default class GifHistory {
  query = (inject(ActivatedRoute).params.pipe(
    map((params) => params['query']),
  ));
}

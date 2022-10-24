import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Story } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class AjaxHelperService {
  constructor() {}

  public initializeDummyData(): Observable<Array<Story>> {
    // HTTP Request to get our stories
    const ajax$ = ajax.getJSON<Array<Story>>('assets/json/dummy-data.json');
    return ajax$;
  }
}

// Example of how to get stories using an observable
// const storiesObservable = this.ajaxHelper.initializeDummyData();

// storiesObservable.subscribe({
//   next: (stories) => {
//     this.yourStories = stories;
//   },
//   error: (err) => console.log(err),
// });

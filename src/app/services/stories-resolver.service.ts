import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Story } from '../types/types';
import { StoriesService } from './stories/stories.service';

@Injectable({
  providedIn: 'root',
})
export class StoriesResolverService implements Resolve<Story[]> {
  constructor(private storiesService: StoriesService) {}

  // This returns Story[] | Observable<Story[]> | Promise<Story[]>
  // Loads the data before a page is loaded
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Story[] | Observable<Story[]> | Promise<Story[]> {
    const stories = this.storiesService.getStories();
    console.log('In resolver');
    if (stories.length === 0) {
      return this.storiesService.fetchStories();
    }
    return stories;
  }
}

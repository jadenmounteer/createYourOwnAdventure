import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Story } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  storyChanged = new Subject<Story[]>();
  startedEditing = new Subject<number>();
  private stories: Story[] = [];

  constructor() {}

  public getStories() {
    return this.stories.slice();
  }

  public getStory(index: number) {
    return this.stories[index];
  }

  public addStory(story: Story) {
    this.stories.push(story);
    this.storyChanged.next(this.stories.slice());
  }

  public updateStory(index: number, newStory: Story) {
    this.stories[index] = newStory;
    this.storyChanged.next(this.stories.slice());
  }
}

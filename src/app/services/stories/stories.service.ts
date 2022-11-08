import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Story } from 'src/app/types/types';
import { AjaxHelperService } from '../ajax-helper/ajax-helper.service';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  storyChanged = new Subject<Story[]>();
  startedEditing = new Subject<number>();
  private stories: Story[] = new Array<Story>();
  public storiesInitialized: boolean = false;

  constructor(private ajaxHelper: AjaxHelperService) {}

  public getStories() {
    return this.stories.slice();
  }

  public getStory(storyId: number | undefined) {
    if (storyId) {
      const indexOfStory = this.getIndexOfStoryBasedOnId(storyId);
      if (indexOfStory != null) {
        return this.stories[indexOfStory];
      }
    }

    return;
  }

  public addStory(story: Story) {
    this.stories.push(story);
    this.storyChanged.next(this.stories.slice());
  }

  public updateStory(storyID: number | undefined, newStory: Story) {
    if (storyID) {
      const indexOfStory = this.getIndexOfStoryBasedOnId(storyID);
      if (indexOfStory != null) {
        this.stories[indexOfStory] = newStory;
        this.storyChanged.next(this.stories.slice());
      }
    }
  }

  public deleteStory(index: number): Array<Story> {
    // TODO delete the story in the db. If successful, then delete it
    // on the frontend
    this.stories.splice(index, 1);
    return this.stories;
  }

  public fetchStories() {
    const storiesObservable = this.ajaxHelper.initializeDummyData();

    storiesObservable.subscribe({
      next: (stories) => {
        this.stories = stories;
        this.storiesInitialized = true;
      },
      error: (err) => console.log(err),
    });
  }

  public getIndexOfStoryBasedOnId(storyID: number): number | null {
    for (let i = 0; i < this.stories.length; i++) {
      if (Number(this.stories[i].id) === Number(storyID)) {
        return i;
      }
    }
    return null;
  }

  public generateNewStoryID(): number {
    // This just generates a random number.
    // In the future, MongoDB will create a unique ID for us.
    let randomNumber = Math.floor(Math.random() * 1000);

    let generatedUniqueNumber = true;

    for (let i = 0; i < this.stories.length; i++) {
      if (Number(this.stories[i].id) === Number(randomNumber)) {
        generatedUniqueNumber = false;
      }
    }

    if (!generatedUniqueNumber) {
      return this.generateNewStoryID();
    } else {
      return randomNumber;
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Subject, take, tap } from 'rxjs';
import { Story } from 'src/app/types/types';
import { AjaxHelperService } from '../ajax-helper/ajax-helper.service';
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class StoriesService {
  startedEditing = new Subject<number>();
  private stories: Story[] = new Array<Story>();
  public storiesInitialized: boolean = false;

  constructor(
    private ajaxHelper: AjaxHelperService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

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
    // TODO We should probably only update one story, but this works for now.
    this.updateAllStories();
  }

  public updateStory(storyID: number | undefined, newStory: Story) {
    if (storyID) {
      const indexOfStory = this.getIndexOfStoryBasedOnId(storyID);
      if (indexOfStory != null) {
        this.stories[indexOfStory] = newStory;
      }
    }
    // TODO We should probably only update one story, but this works for now.
    this.updateAllStories();
  }

  public deleteStory(index: number): Array<Story> {
    // TODO delete the story in the db. If successful, then delete it
    // on the frontend
    this.stories.splice(index, 1);
    // TODO We should probably only update one story, but this works for now.
    this.updateAllStories();

    return this.stories;
  }

  public updateAllStories() {
    this.http
      .put(
        'https://create-your-own-adventur-a10c1-default-rtdb.firebaseio.com/stories.json',
        this.stories
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  public fetchStories() {
    return this.http
      .get<Story[]>(
        'https://create-your-own-adventur-a10c1-default-rtdb.firebaseio.com/stories.json'
      )
      .pipe(
        tap((stories) => {
          this.setStories(stories);
        })
      );
  }

  private setStories(stories: Story[]) {
    this.stories = stories;
    this.storiesInitialized = true;
  }

  public fetchDummyData() {
    const storiesObservable = this.ajaxHelper.initializeDummyData();

    storiesObservable.subscribe({
      next: (stories) => {
        this.setStories(stories);
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

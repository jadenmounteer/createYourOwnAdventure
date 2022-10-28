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
  // private stories: Story[] = [
  //   {
  //     id: 1,
  //     userID: 1,
  //     title: 'Journey Under the Sea',
  //     description:
  //       'Jouney under the sea in this thrilling choose your own adventure book.',
  //     draft: false,
  //     pages: [
  //       {
  //         pageNumber: 1,
  //         currentPage: false,
  //         pageText: 'Once upon  time...',
  //         whenReaderFinishesPage: 1,
  //         choices: [
  //           {
  //             number: 1,
  //             text: 'Follow the Cpt. Nemo into the Nautilus',
  //             linksToPage: 2,
  //           },
  //         ],
  //         nextPage: 2,
  //       },
  //       {
  //         pageNumber: 2,
  //         currentPage: false,
  //         nextPage: undefined,
  //         pageText:
  //           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies nibh in nulla consequat, vitae luctus lectus dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris sodales pretium pellentesque. Pellentesque fermentum justo non libero placerat placerat. Fusce sit amet finibus velit. Suspendisse volutpat condimentum sapien, ac fringilla velit tempor quis. Pellentesque eget ex mollis, vehicula lectus sit amet, finibus elit. <br>  Morbi est ex, faucibus a lectus in, gravida imperdiet libero. In vitae enim non velit dapibus molestie in sed augue. Phasellus ut felis et augue feugiat bibendum. Morbi non ultrices augue, ut semper est. In convallis luctus vulputate. Sed sollicitudin ipsum sit amet magna gravida, pellentesque laoreet lacus vulputate. Aliquam condimentum rhoncus magna fringilla fringilla.',
  //         whenReaderFinishesPage: 2,
  //         choices: [
  //           {
  //             number: 1,
  //             text: 'Follow the Cpt. Nemo into the Nautilus',
  //             linksToPage: 3,
  //           },
  //           {
  //             number: 2,
  //             text: 'Refuse and stay on dry land.',
  //             linksToPage: 4,
  //           },
  //         ],
  //       },
  //       {
  //         pageNumber: 3,
  //         currentPage: false,
  //         pageText: 'You follow Cpt. Nemo into the Nautilus',
  //         whenReaderFinishesPage: 1,
  //         choices: [
  //           {
  //             number: 1,
  //             text: 'Follow the Cpt. Nemo into the Nautilus',
  //             linksToPage: 3,
  //           },
  //           {
  //             number: 2,
  //             text: 'Refuse and stay on dry land.',
  //             linksToPage: 5,
  //           },
  //         ],
  //         nextPage: 5,
  //       },
  //       {
  //         pageNumber: 4,
  //         currentPage: false,
  //         pageText:
  //           'You stay on dry land and miss out on an awesome adventure.',
  //         whenReaderFinishesPage: 3,
  //       },
  //       {
  //         pageNumber: 5,
  //         currentPage: false,
  //         pageText: 'You explore the Nautilus',
  //         whenReaderFinishesPage: 3,
  //       },
  //     ],
  //   },
  // ];

  private stories: Story[] = new Array<Story>();

  constructor(private ajaxHelper: AjaxHelperService) {
    console.log('New instance of stories service created');
  }

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
        console.log('Initiltialized stories in service');
      },
      error: (err) => console.log(err),
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Story } from '../types/types';
import { StoriesService } from '../services/stories/stories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public yourStories: Array<Story> = [];
  subscription: Subscription | undefined;
  closeResult: string | undefined;
  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;
  public storyToDelete!: Story;
  public confirmModalMessage: string = '';

  constructor(private router: Router, private storiesService: StoriesService) {}

  ngOnInit(): void {
    // this.storiesService.fetchDummyData();
    // console.log(this.storiesService.storiesInitialized);
    // if (!this.storiesService.storiesInitialized) {
    // }
    // this.storiesService.fetchStories();
    this.yourStories = this.storiesService.getStories();
    this.removeSampleStory();
  }

  private removeSampleStory() {
    let index = 0;
    this.yourStories.forEach((story) => {
      if (story.id === undefined) {
        this.yourStories.splice(index, 1);
        index++;
      }
    });
  }

  public onDeleteStory(story: Story) {
    this.storyToDelete = story;
    this.confirmModalMessage = `Are you sure you want to delete ${story.title}?`;
    this.confirmModal.open();
  }

  public editStory(story: Story) {
    this.router.navigate([`/createOrEditStory/${story.id}`]);
  }

  confirmedDelete() {
    const indexOfStory = this.yourStories.indexOf(this.storyToDelete);
    if (indexOfStory > -1) {
      this.yourStories = this.storiesService.deleteStory(indexOfStory);
    }

    // TODO delete from the db as well.
  }

  public readStory(story: Story) {
    this.router.navigate([`/readStory/${story.id}`]);
  }

  public createNewStory() {
    this.router.navigate(['/createOrEditStory']);
  }
}

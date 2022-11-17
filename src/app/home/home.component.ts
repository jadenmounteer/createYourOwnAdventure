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
    if (this.storiesService.storiesInitialized) {
      console.log('getting stories in home');
      this.yourStories = this.storiesService.getStories();
    } else {
      // TODO I shouldn't have to fetch the stories again after the resolver
      this.storiesService.fetchStories().subscribe({
        next: (stories) => {
          this.yourStories = stories;
        },
      });
    }

    // TODO I can remove everything to do with this subscription
    this.subscription = this.storiesService.storiesChanged.subscribe(
      (stories: Story[]) => {
        this.yourStories = stories;
      }
    );
    this.yourStories = this.storiesService.getStories();
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

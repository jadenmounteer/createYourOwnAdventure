import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Story } from '../types/types';
import { StoriesService } from '../services/stories/stories.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';
import { User } from '../auth/user.model';

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
  public showAlert: boolean = false;
  public user!: User;

  constructor(
    private router: Router,
    private storiesService: StoriesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.storiesService.fetchDummyData();
    // console.log(this.storiesService.storiesInitialized);
    // if (!this.storiesService.storiesInitialized) {
    // }
    // this.storiesService.fetchStories();
    this.yourStories = this.storiesService.getStories();
    this.removeSampleStory();
    this.user = JSON.parse(String(localStorage.getItem('userData')));
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
  }

  public readStory(story: Story) {
    this.router.navigate([`/readStory/${story.id}`]);
  }

  public createNewStory() {
    this.router.navigate(['/createOrEditStory']);
  }

  public shareStory(story: Story) {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
    const shareableLink = this.createShareableLink(story);
    console.log(shareableLink);
  }

  private createShareableLink(story: Story): string {
    // Dev
    return `http://localhost:4200/a-story-has-been-shared-with-you/${this.user.id}/${story.id}`;

    // Prod
    // return `https://jadenmounteer.github.io/createYourOwnAdventure/a-story-has-been-shared-with-you/${this.user.id}/${story.id}`;
  }
}

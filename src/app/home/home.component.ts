import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Story } from '../types/types';
import { ajax } from 'rxjs/ajax';
import { AjaxHelperService } from '../services/ajax-helper/ajax-helper.service';
import { StoriesService } from '../services/stories/stories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StoriesService],
})
export class HomeComponent implements OnInit {
  public yourStories: Array<Story> = [];
  closeResult: string | undefined;
  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;
  public storyToDelete!: Story;
  public confirmModalMessage: string = '';

  constructor(private router: Router, private storiesService: StoriesService) {}

  ngOnInit(): void {
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

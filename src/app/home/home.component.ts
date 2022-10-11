import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Story } from '../types/types';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public yourStories: Array<Story> = [];
  closeResult: string | undefined;
  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;
  public storyToDelete!: Story;
  public confirmModalMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeDummyData();
  }

  public initializeDummyData() {
    // HTTP Request to get our stories
    const ajax$ = ajax.getJSON<Array<Story>>('assets/json/dummy-data.json');

    ajax$.subscribe({
      next: (stories) => {
        this.yourStories = stories;
      },
      error: (err) => console.log(err),
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
      this.yourStories.splice(indexOfStory, 1);
    }

    // TODO delete from the db as well.
  }

  public readStory(story: Story) {
    // TODO finish this method
    console.log('Reading story');
    const indexOfStory = this.yourStories.indexOf(story);
    console.log(indexOfStory);
  }

  public createNewStory() {
    this.router.navigate(['/createOrEditStory']);
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Story } from '../types/story.type';

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

  constructor() {}

  ngOnInit(): void {
    // Add stories
    const newStory: Story = {
      name: 'A tale of two cities',
      description: 'A story by Charles Dickens',
    };

    const anotherStory: Story = {
      name: 'Twenty Thousand Leagues Under the Sea',
      description: 'Follow the adventures of Cpt. Nemo under the sea.',
    };

    this.yourStories.push(newStory);
    this.yourStories.push(anotherStory);
  }

  public onDeleteStory(story: Story) {
    this.storyToDelete = story;
    this.confirmModalMessage = `Are you sure you want to delete ${story.name}?`;
    this.confirmModal.open();
  }

  public editStory(story: Story) {
    // TODO finish this method
    console.log('Editing story');
    const indexOfStory = this.yourStories.indexOf(story);
    console.log(indexOfStory);
  }

  confirmedDelete() {
    // TODO delete from the db as well.
    // Make a modal appear too to confirm
    const indexOfStory = this.yourStories.indexOf(this.storyToDelete);
    if (indexOfStory > -1) {
      // only splice array when item is found
      this.yourStories.splice(indexOfStory, 1); // 2nd parameter means remove one item only
    }
  }

  public readStory(story: Story) {
    // TODO finish this method
    console.log('Reading story');
    const indexOfStory = this.yourStories.indexOf(story);
    console.log(indexOfStory);
  }
}

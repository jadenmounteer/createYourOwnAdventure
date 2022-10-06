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
      name: 'Journy Under the Sea',
      description:
        'Jouney under the sea in this thrilling choose your own adventure book.',
    };

    const anotherStory: Story = {
      name: 'The Abominable Snowman',
      description:
        'Test yourself in this adventure with the abominable snowman.',
    };

    const yetAnotherStory: Story = {
      name: 'Space And Beyond',
      description: 'Where will you go in Space and Beyond?',
    };

    const yesAnotherStory: Story = {
      name: 'The Mystery of the Maya',
      description: 'Discover the mysteries of this ancient people.',
    };

    const youGuessedIt: Story = {
      name: 'The Cave of Time',
      description: 'Journey back in time.',
    };

    this.yourStories.push(newStory);
    this.yourStories.push(anotherStory);
    this.yourStories.push(yetAnotherStory);
    this.yourStories.push(yesAnotherStory);
    this.yourStories.push(youGuessedIt);
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

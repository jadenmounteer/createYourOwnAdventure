import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

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
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue augue. In in enim vel neque luctus tristique. Pellentesque eleifend tristique arcu, eu eleifend tortor aliquam lacinia. Fusce venenatis id tellus ut aliquet. Vivamus nec quam sit amet purus consequat lobortis. Cras sit amet tristique nisl. Cras erat dui, cursus vitae metus nec, ullamcorper eleifend enim. Nulla finibus ac leo in porta.',
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

  public createNewStory() {
    this.router.navigate(['/createOrEditStory']);
  }
}

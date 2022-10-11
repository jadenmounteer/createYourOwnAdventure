import { Component, OnInit, ViewChild } from '@angular/core';
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
      id: 1,
      name: 'Journy Under the Sea',
      description:
        'Jouney under the sea in this thrilling choose your own adventure book.',
      draft: false,
    };

    const anotherStory: Story = {
      id: 2,
      name: 'The Abominable Snowman',
      description:
        'Test yourself in this adventure with the abominable snowman.',
      draft: true,
    };

    const yetAnotherStory: Story = {
      id: 3,
      name: 'Space And Beyond',
      description: 'Where will you go in Space and Beyond?',
      draft: false,
    };

    const yesAnotherStory: Story = {
      id: 4,
      name: 'The Mystery of the Maya',
      description: 'Discover the mysteries of this ancient people.',
      draft: false,
    };

    const youGuessedIt: Story = {
      id: 5,
      name: 'The Cave of Time',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue augue. In in enim vel neque luctus tristique. Pellentesque eleifend tristique arcu, eu eleifend tortor aliquam lacinia. Fusce venenatis id tellus ut aliquet. Vivamus nec quam sit amet purus consequat lobortis. Cras sit amet tristique nisl. Cras erat dui, cursus vitae metus nec, ullamcorper eleifend enim. Nulla finibus ac leo in porta.',
      draft: false,
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

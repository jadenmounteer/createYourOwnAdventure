import { Component, OnInit } from '@angular/core';
import { Story } from '../types/story.type';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public yourStories: Array<Story> = [];
  closeResult: string | undefined;

  constructor() {}

  ngOnInit(): void {
    // Add stories
    const newStory: Story = {
      name: "A tale of two cities",
      description: "A story by Charles Dickens"
    };

    const anotherStory: Story = {
      name: "Twenty Thousand Leagues Under the Sea",
      description: "Follow the adventures of Cpt. Nemo under the sea."
    };

    this.yourStories.push(newStory);
    this.yourStories.push(anotherStory);

  }

  public deleteStory(story: Story) {
    // TOOD delete from the db as well.
    // Make a modal appear too to confirm
    console.log("Deleting story");

    // Open the confirm modal
    
    


    const indexOfStory = this.yourStories.indexOf(story);
    if (indexOfStory > -1) { // only splice array when item is found
      this.yourStories.splice(indexOfStory, 1); // 2nd parameter means remove one item only
    }
  }

  public editStory(story: Story) {
    // TOOD finish this method
    console.log("Editing story");
    const indexOfStory = this.yourStories.indexOf(story);
    console.log(indexOfStory);
  }

  public readStory(story: Story) {
    // TODO finish this method
    console.log("Reading story");
    const indexOfStory = this.yourStories.indexOf(story);
    console.log(indexOfStory);
  }

  // open(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     console.log(reason);
  //   });
  // }

}

import { Component, OnInit } from '@angular/core';
import { Story } from '../types/story.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public yourStories: Array<Story> = [];

  constructor() { }

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
    console.log("Deleting story");
    const indexOfStory = this.yourStories.indexOf(story);
    console.log(indexOfStory);
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

}

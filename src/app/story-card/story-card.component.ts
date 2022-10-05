import { Component, Input, OnInit } from '@angular/core';
import { Story } from '../types/story.type';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss']
})
export class StoryCardComponent implements OnInit {
  @Input()
  story!: Story;

  constructor() {
   }

  ngOnInit(): void {
    console.log(this.story);
  }

}

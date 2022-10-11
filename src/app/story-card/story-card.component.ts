import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Story } from '../types/story.type';
@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
})
export class StoryCardComponent implements OnInit {
  @Input()
  story!: Story;
  @Output() deleteStory = new EventEmitter();
  @Output() editStory = new EventEmitter();
  @Output() readStory = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}

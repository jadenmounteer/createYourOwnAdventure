import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Story } from '../types/types';
declare var $: any; // For Jquery

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
})
export class StoryCardComponent {
  @Input()
  story!: Story;
  @Output() deleteStory = new EventEmitter();
  @Output() editStory = new EventEmitter();
  @Output() readStory = new EventEmitter();
  @Output() shareStory = new EventEmitter();

  public copiedLink: boolean = false;

  constructor() {
    // Initialize the tooltips using jquery. Not sure why, but we have to do this.
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  onShare() {
    this.copiedLink = true;
    setTimeout(() => {
      this.copiedLink = false;
    }, 5000);

    this.shareStory.emit();
  }
}

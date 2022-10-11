import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-or-edit-story',
  templateUrl: './create-or-edit-story.component.html',
  styleUrls: ['./create-or-edit-story.component.scss'],
})
export class CreateOrEditStoryComponent implements OnInit {
  @Input()
  createStory: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}

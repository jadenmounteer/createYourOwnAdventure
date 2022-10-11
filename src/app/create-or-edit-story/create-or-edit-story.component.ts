import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-or-edit-story',
  templateUrl: './create-or-edit-story.component.html',
  styleUrls: ['./create-or-edit-story.component.scss'],
})
export class CreateOrEditStoryComponent implements OnInit {
  @Input()
  createStory: boolean = true;
  constructor(private route: ActivatedRoute) {}
  private storyID: number | undefined;

  ngOnInit(): void {
    // Get the story ID
    this.route.params.subscribe((params: Params) => {
      this.storyID = params['id'];
    });
  }
}

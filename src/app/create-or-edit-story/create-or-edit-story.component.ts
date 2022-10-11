import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-or-edit-story',
  templateUrl: './create-or-edit-story.component.html',
  styleUrls: ['./create-or-edit-story.component.scss'],
})
export class CreateOrEditStoryComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  public storyID: number | undefined;

  ngOnInit(): void {
    // Get the story ID if we are editing
    this.route.params.subscribe((params: Params) => {
      this.storyID = params['id'];
    });

    // TODO If we are editing, retreive the story details from the db
  }
}

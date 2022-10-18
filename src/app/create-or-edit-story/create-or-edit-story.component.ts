import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
declare var $: any; // For Jquery

@Component({
  selector: 'app-create-or-edit-story',
  templateUrl: './create-or-edit-story.component.html',
  styleUrls: ['./create-or-edit-story.component.scss'],
})
export class CreateOrEditStoryComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    // Initialize the tooltips using jquery. Not sure why, but we have to do this.
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  public storyID: number | undefined;
  public enablePublish: boolean = false; // TODO Make the publish button appear if we have an ending.

  ngOnInit(): void {
    // Get the story ID if we are editing
    this.route.params.subscribe((params: Params) => {
      this.storyID = params['id'];
    });

    // TODO If we are editing, retreive the story details from the db
  }

  onPublish(form: NgForm) {
    console.log('Submitting form');
    console.log(form);
  }

  onSaveDraft() {
    console.log('Saving draft');
  }
}

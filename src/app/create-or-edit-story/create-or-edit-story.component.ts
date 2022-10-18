import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoriesService } from '../services/stories/stories.service';
import { Story } from '../types/types';
declare var $: any; // For Jquery

@Component({
  selector: 'app-create-or-edit-story',
  templateUrl: './create-or-edit-story.component.html',
  styleUrls: ['./create-or-edit-story.component.scss'],
  providers: [StoriesService],
})
export class CreateOrEditStoryComponent implements OnInit {
  public editMode: boolean = false;
  public subscription: Subscription | undefined;
  public editedItemIndex: number | undefined;
  public editedItem?: Story;
  @ViewChild('form') form?: NgForm;

  constructor(
    private route: ActivatedRoute,
    private storiesService: StoriesService
  ) {
    // Initialize the tooltips using jquery. Not sure why, but we have to do this.
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  public storyID: number | undefined;

  ngOnInit(): void {
    // Get the story ID if we are editing
    this.route.params.subscribe((params: Params) => {
      this.storyID = params['id'];
    });

    this.enableEditMode();

    // TODO If we are editing, retreive the story details from the db
  }

  private enableEditMode() {
    if (this.storyID) {
      this.subscription = this.storiesService.startedEditing.subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.storiesService.getStory(index);
          this.form?.setValue({
            title: this.editedItem.title,
          });
        }
      );
    }
  }

  public onSubmit(form: NgForm) {
    const value = form.value;
    const title = value.title;
    console.log('Submitting form for ' + title);

    // const newStory = new Story(value.title);

    // TODO Finish this. Watch the video #222 in the course.
    if (this.editMode) {
      // this.storiesService.updateStory(this.editedItemIndex, newStory);
    } else {
      // this.storiesService.addStory(newStory);
    }
    // TODO Save the pages and organize them into a story
  }

  public onSaveDraft() {
    console.log('Saving draft');
  }
}

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
  public storyToEdit?: Story;
  @ViewChild('f') storyForm?: NgForm;

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

    this.setFormData();
  }

  private setFormData(): void {
    if (this.storyID) {
      this.storiesService.getStories().forEach((story) => {
        if (this.storyID == story.id) {
          this.editMode = true;
          this.storyToEdit = story;
        }
      });
      return;
    }

    this.storyToEdit = {
      id: undefined,
      userID: undefined,
      title: undefined,
      description: undefined,
      draft: true,
      pages: [
        {
          pageNumber: 1,
          currentPage: true,
          pageText: undefined,
          whenReaderFinishesPage: undefined,
          choices: undefined,
          nextPage: undefined,
        },
      ],
    };
    return;
  }

  public onSubmit(storyForm: NgForm) {
    const value = storyForm.value;
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

  public onChangeTitle(): void {
    if (this.storyToEdit) {
      this.storyToEdit.title = this.storyForm?.value.title;
      return;
    }
  }

  public onChangePageText(pageNumber: number, event: any): void {
    this.storyToEdit?.pages.forEach((page) => {
      if (page.pageNumber === pageNumber) {
        page.pageText = event.target.value;
      }
    });
    return;
  }

  public onChangeWhenReaderFinishesPage(pageNumber: number, event: any): void {
    this.storyToEdit?.pages.forEach((page) => {
      if (page.pageNumber === pageNumber) {
        page.whenReaderFinishesPage = event.target.value;
      }
    });
    return;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { StoriesService } from '../services/stories/stories.service';
import { Choice, Page, Story } from '../types/types';
declare var $: any; // For Jquery

@Component({
  selector: 'app-create-or-edit-story',
  templateUrl: './create-or-edit-story.component.html',
  styleUrls: ['./create-or-edit-story.component.scss'],
})
export class CreateOrEditStoryComponent implements OnInit {
  public editMode: boolean = false;
  public subscription: Subscription | undefined;
  public editedItemIndex: number | undefined;
  public editedItem?: Story;
  public storyToEdit?: Story;
  public showTestDiv: boolean = true;
  public yourStories: Array<Story> = [];
  @ViewChild('f') storyForm?: NgForm;
  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;
  public confirmModalMessage: string = '';
  private pageToDelete!: Page;

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
        page.whenReaderFinishesPage = Number(event.target.value);
        if (!page.choices) {
          this.addChoice(page);
        }
      }
    });
    return;
  }

  public addChoice(page: Page) {
    let newChoice: Choice = {
      number: this.getChoiceNumber(page),
      text: '',
      linksToPage: undefined,
    };

    if (page.choices === undefined) {
      page.choices = [newChoice];
    } else {
      page.choices?.push(newChoice);
    }
  }

  private getChoiceNumber(page: Page): number {
    if (page.choices) {
      return page.choices.length + 1;
    }
    return 1;
  }

  public addPage() {
    const newPage: Page = {
      pageNumber: Number(this.storyToEdit?.pages.length) + 1,
      pageText: undefined,
      currentPage: false,
      whenReaderFinishesPage: undefined,
      choices: undefined,
      nextPage: undefined,
    };

    this.storyToEdit?.pages.push(newPage);
  }

  public onDeletePage(pageToDelete: Page) {
    this.pageToDelete = pageToDelete;
    this.confirmModalMessage = `Are you sure you want to delete page number ${pageToDelete.pageNumber}?`;
    this.confirmModal.open();
  }

  public confirmDeletePage() {}
}

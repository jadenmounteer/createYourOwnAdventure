import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AjaxHelperService } from '../services/ajax-helper/ajax-helper.service';
import { PreviousPagesService } from '../services/previous-pages/previous-pages.service';
import { Page, Story } from '../types/types';

@Component({
  selector: 'app-read-story',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.scss'],
})
export class ReadStoryComponent implements OnInit {
  public story: Story | undefined;
  public storyID: number | undefined;
  public currentPage: Page | undefined;
  public showChoices: boolean = false;
  public continueToNextPage: boolean = false;
  public showEnding: boolean = false;
  public lastPage: Page | undefined;

  constructor(
    private route: ActivatedRoute,
    private ajaxHelper: AjaxHelperService,
    public previousPages: PreviousPagesService<Page>
  ) {}

  ngOnInit(): void {
    // Get the story ID if we are editing
    this.route.params.subscribe((params: Params) => {
      this.storyID = params['id'];
    });

    const storiesObservable = this.ajaxHelper.initializeDummyData();

    storiesObservable.subscribe({
      next: (stories) => {
        stories.forEach((story) => {
          if (story.id === Number(this.storyID)) {
            this.story = story;
            this.findCurrentPage(story);
            this.determineWhatToDoWhenReaderFinishesPage();
          }
        });
      },
      error: (err) => console.log(err),
    });
  }

  private findCurrentPage(story: Story) {
    story.pages.forEach((page) => {
      if (page.currentPage) {
        this.currentPage = page;
      }
    });

    if (!this.currentPage) {
      this.currentPage = story.pages[0];
    }
  }

  private determineWhatToDoWhenReaderFinishesPage() {
    if (this.currentPage) {
      switch (this.currentPage.whenReaderFinishesPage) {
        case 1:
          this.continueToNextPage = true;
          break;
        case 2:
          this.showChoices = true;
          break;
        default:
          this.showEnding = true;
          break;
      }
    }
  }

  public goToNextPage() {
    if (this.currentPage && this.story) {
      const nextPageNumber = this.currentPage.pageNumber + 1;

      this.story.pages.forEach((page) => {
        if (this.currentPage && page.pageNumber === nextPageNumber) {
          this.previousPages.push(this.currentPage);
          this.currentPage = page;
        }
      });
    }
  }

  public goToLastPage() {
    this.currentPage = this.previousPages.pop();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AjaxHelperService } from '../services/ajax-helper/ajax-helper.service';
import { PreviousPagesService } from '../services/previous-pages/previous-pages.service';
import { Choice, Page, Story } from '../types/types';

@Component({
  selector: 'app-read-story',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.scss'],
  providers: [AjaxHelperService],
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
    this.previousPages.clearAll();
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
          this.showChoices = false;
          this.showEnding = false;
          break;
        case 2:
          this.showChoices = true;
          this.continueToNextPage = false;
          this.showEnding = false;
          break;
        default:
          this.showEnding = true;
          this.showChoices = false;
          this.continueToNextPage = false;
          break;
      }
    }
  }

  public goToNextPage() {
    if (this.currentPage && this.story) {
      const nextPageNumber = this.currentPage.nextPage;

      this.story.pages.forEach((page) => {
        if (this.currentPage && page.pageNumber === nextPageNumber) {
          this.goToPage(page);
        }
      });
    }
  }

  public goToLastPage() {
    this.currentPage = this.previousPages.pop();
    this.determineWhatToDoWhenReaderFinishesPage();
  }

  public makeChoice(choice: Choice) {
    const linkedPage = choice.linksToPage;

    if (this.story) {
      this.story.pages.forEach((page) => {
        if (this.currentPage && page.pageNumber === linkedPage) {
          this.goToPage(page);
        }
      });
    }
  }

  private goToPage(pageToGoTo: Page) {
    if (this.currentPage) {
      this.previousPages.push(this.currentPage);
      this.currentPage = pageToGoTo;
      this.determineWhatToDoWhenReaderFinishesPage();
    }
  }
}

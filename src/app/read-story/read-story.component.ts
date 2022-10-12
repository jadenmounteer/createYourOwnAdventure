import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AjaxHelperService } from '../services/ajax-helper.service';
import { Story } from '../types/types';

@Component({
  selector: 'app-read-story',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.scss'],
})
export class ReadStoryComponent implements OnInit {
  public story: Story | undefined;
  public storyID: number | undefined;
  public currentPage: number = 3;

  constructor(
    private route: ActivatedRoute,
    private ajaxHelper: AjaxHelperService
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
          }
        });
      },
      error: (err) => console.log(err),
    });
  }
}

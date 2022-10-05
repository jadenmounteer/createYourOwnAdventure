import { Component, OnInit } from '@angular/core';
import { Story } from '../types/story.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public yourStories: Array<Story> = [];

  constructor() { }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { StoryCardComponent } from './story-card/story-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CreateOrEditStoryComponent } from './create-or-edit-story/create-or-edit-story.component';
import { RouterModule, Routes } from '@angular/router';
import { ReadStoryComponent } from './read-story/read-story.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'createOrEditStory/:id',
    component: CreateOrEditStoryComponent,
  },
  {
    path: 'createOrEditStory', // Don't pass in an id to get to the create page
    component: CreateOrEditStoryComponent,
  },
  {
    path: 'readStory/:id',
    component: ReadStoryComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    StoryCardComponent,
    ConfirmModalComponent,
    CreateOrEditStoryComponent,
    ReadStoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

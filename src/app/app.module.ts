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
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

const appRoutes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'homePage',
    component: HomeComponent,
  },
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
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FontAwesomeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, farStar);
  }
}

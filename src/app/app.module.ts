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
import {
  faBook,
  faBookOpen,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { StoriesResolverService } from './services/stories-resolver.service';
import { StoriesService } from './services/stories/stories.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { AStoryHasBeenSharedWithYouComponent } from './a-story-has-been-shared-with-you/a-story-has-been-shared-with-you.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'homePage',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: [StoriesResolverService], // Resolver runs to make sure observable ends and data is loaded before route is loaded.
  },
  {
    path: 'createOrEditStory/:id',
    component: CreateOrEditStoryComponent,
    canActivate: [AuthGuard],
    resolve: [StoriesResolverService],
  },
  {
    path: 'createOrEditStory', // Don't pass in an id to get to the create page
    canActivate: [AuthGuard],
    component: CreateOrEditStoryComponent,
  },
  {
    path: 'readStory/:id',
    component: ReadStoryComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'a-story-has-been-shared-with-you/:userID/:storyID',
    component: AStoryHasBeenSharedWithYouComponent,
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
    AuthComponent,
    LoadingSpinnerComponent,
    AStoryHasBeenSharedWithYouComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    StoriesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrash, faBook, faBookOpen, faUser);
  }
}

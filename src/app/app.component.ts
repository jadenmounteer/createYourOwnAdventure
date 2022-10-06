import { Component, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'createYourOwnAdventure';
  closeResult: string | undefined;
  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  constructor() {}


  public confirmDeleteStory() {
    this.confirmModal.open();
  }

}

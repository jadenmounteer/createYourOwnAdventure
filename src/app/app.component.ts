import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'createYourOwnAdventure';
  closeResult: string | undefined;
  @ViewChild('confirmModal') confirmModal!: ModalComponent;

  constructor() {}


  public confirmDeleteStory() {
    this.confirmModal.open();
  }

}

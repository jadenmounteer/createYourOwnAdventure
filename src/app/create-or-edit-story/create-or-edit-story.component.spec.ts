import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditStoryComponent } from './create-or-edit-story.component';

describe('CreateOrEditStoryComponent', () => {
  let component: CreateOrEditStoryComponent;
  let fixture: ComponentFixture<CreateOrEditStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

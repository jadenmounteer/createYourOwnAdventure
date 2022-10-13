import { TestBed } from '@angular/core/testing';

import { PreviousPagesService } from './previous-pages.service';

describe('PreviousPagesService', () => {
  let service: PreviousPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

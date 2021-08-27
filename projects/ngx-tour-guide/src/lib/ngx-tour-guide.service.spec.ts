import { TestBed } from '@angular/core/testing';

import { NgxTourGuideService } from './ngx-tour-guide.service';

describe('NgxTourGuideService', () => {
  let service: NgxTourGuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTourGuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

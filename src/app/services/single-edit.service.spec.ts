import { TestBed } from '@angular/core/testing';

import { SingleEditService } from './single-edit.service';

describe('SingleEditService', () => {
  let service: SingleEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

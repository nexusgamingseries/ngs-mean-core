import { TestBed } from '@angular/core/testing';

import { SharedValidatorsService } from './shared-validators.service';

describe('SharedValidatorsService', () => {
  let service: SharedValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

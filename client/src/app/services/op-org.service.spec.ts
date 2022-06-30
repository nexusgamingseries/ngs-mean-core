import { TestBed } from '@angular/core/testing';

import { OpOrgService } from './op-org.service';

describe('OpOrgService', () => {
  let service: OpOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

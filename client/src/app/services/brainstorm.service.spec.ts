import { TestBed } from '@angular/core/testing';

import { BrainstormService } from './brainstorm.service';

describe('BrainstormService', () => {
  let service: BrainstormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrainstormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

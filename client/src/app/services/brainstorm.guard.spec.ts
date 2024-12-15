import { TestBed } from '@angular/core/testing';

import { BrainstormGuard } from './brainstorm.guard';

describe('BrainstormGuard', () => {
  let guard: BrainstormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BrainstormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

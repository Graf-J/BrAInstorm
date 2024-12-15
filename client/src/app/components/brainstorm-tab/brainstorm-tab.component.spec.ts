import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainstormTabComponent } from './brainstorm-tab.component';

describe('BrainstormTabComponent', () => {
  let component: BrainstormTabComponent;
  let fixture: ComponentFixture<BrainstormTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrainstormTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrainstormTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

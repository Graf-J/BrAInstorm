import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextAiTabComponent } from './context-ai-tab.component';

describe('ContextAiTabComponent', () => {
  let component: ContextAiTabComponent;
  let fixture: ComponentFixture<ContextAiTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextAiTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextAiTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskComponent } from './sub-task.component';

describe('SubTaskComponent', () => {
  let component: SubTaskComponent;
  let fixture: ComponentFixture<SubTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubTaskComponent]
    });
    fixture = TestBed.createComponent(SubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

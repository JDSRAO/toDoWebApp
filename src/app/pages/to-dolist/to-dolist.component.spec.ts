import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDolistComponent } from './to-dolist.component';

describe('ToDolistComponent', () => {
  let component: ToDolistComponent;
  let fixture: ComponentFixture<ToDolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

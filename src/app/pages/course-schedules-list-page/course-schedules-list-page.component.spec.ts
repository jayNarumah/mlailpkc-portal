import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSchedulesListPageComponent } from './course-schedules-list-page.component';

describe('CourseSchedulesListPageComponent', () => {
  let component: CourseSchedulesListPageComponent;
  let fixture: ComponentFixture<CourseSchedulesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSchedulesListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseSchedulesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

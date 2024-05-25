import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseScheduleDetailsPageComponent } from './course-schedule-details-page.component';

describe('CourseScheduleDetailsPageComponent', () => {
  let component: CourseScheduleDetailsPageComponent;
  let fixture: ComponentFixture<CourseScheduleDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseScheduleDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseScheduleDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoursesComponent } from './my-subscriptions.component';

describe('MyCoursesComponent', () => {
    let component: MyCoursesComponent;
    let fixture: ComponentFixture<MyCoursesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyCoursesComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MyCoursesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

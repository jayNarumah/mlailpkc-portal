import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqPageComponent } from './faq-page.component';

describe('ProfilePageComponent', () => {
    let component: FaqPageComponent;
    let fixture: ComponentFixture<FaqPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FaqPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FaqPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

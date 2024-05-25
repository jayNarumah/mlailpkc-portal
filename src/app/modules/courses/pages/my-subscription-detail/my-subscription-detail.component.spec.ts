import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscriptionDetailComponent } from './my-subscription-detail.component';

describe('MySubscriptionDetailComponent', () => {
  let component: MySubscriptionDetailComponent;
  let fixture: ComponentFixture<MySubscriptionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySubscriptionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySubscriptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteBookingComponent } from './complete-booking.component';

describe('CompleteBookingComponent', () => {
  let component: CompleteBookingComponent;
  let fixture: ComponentFixture<CompleteBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

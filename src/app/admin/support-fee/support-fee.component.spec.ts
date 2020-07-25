import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFeeComponent } from './support-fee.component';

describe('SupportFeeComponent', () => {
  let component: SupportFeeComponent;
  let fixture: ComponentFixture<SupportFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

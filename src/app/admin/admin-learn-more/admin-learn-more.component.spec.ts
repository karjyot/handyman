import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLearnMoreComponent } from './admin-learn-more.component';

describe('AdminLearnMoreComponent', () => {
  let component: AdminLearnMoreComponent;
  let fixture: ComponentFixture<AdminLearnMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLearnMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLearnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

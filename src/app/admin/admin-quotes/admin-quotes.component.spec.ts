import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuotesComponent } from './admin-quotes.component';

describe('AdminQuotesComponent', () => {
  let component: AdminQuotesComponent;
  let fixture: ComponentFixture<AdminQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

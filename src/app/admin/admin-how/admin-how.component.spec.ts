import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHowComponent } from './admin-how.component';

describe('AdminHowComponent', () => {
  let component: AdminHowComponent;
  let fixture: ComponentFixture<AdminHowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

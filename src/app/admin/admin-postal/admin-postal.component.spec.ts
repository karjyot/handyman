import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostalComponent } from './admin-postal.component';

describe('AdminPostalComponent', () => {
  let component: AdminPostalComponent;
  let fixture: ComponentFixture<AdminPostalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

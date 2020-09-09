import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminUsersComponent } from './admin-admin-users.component';

describe('AdminAdminUsersComponent', () => {
  let component: AdminAdminUsersComponent;
  let fixture: ComponentFixture<AdminAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandymanServicesComponent } from './handyman-services.component';

describe('HandymanServicesComponent', () => {
  let component: HandymanServicesComponent;
  let fixture: ComponentFixture<HandymanServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandymanServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandymanServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

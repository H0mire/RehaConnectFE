import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Patients } from './patients.component';

describe('Patients', () => {
  let component: Patients;
  let fixture: ComponentFixture<Patients>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Patients ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Patients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

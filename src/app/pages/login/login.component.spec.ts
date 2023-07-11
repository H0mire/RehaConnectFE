import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  //Deklaration der LoginComponent als zu testende Komponente
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  //Erstellung und Initialisierungsprozess der Komponente
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Überprüfung ob Komponente erfolgreich erstellt wurde
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

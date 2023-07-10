import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  //RegisterComponent wird als zu testende Komponente festgelegt
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  //Erstellung und Initialisierungsprozess der Komponente
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   //Überprüfung ob Komponente erfolgreich erstellt wurde
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

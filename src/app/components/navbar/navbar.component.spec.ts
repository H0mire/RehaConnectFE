//Importe aus den Libraries und Frameworks
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  //Methode zur Deklaration und Kompilierung der zu testenden Komponenten
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  //Methode zur Erstellung der Komponenteninstanz und zur Durchführung der Komponenteninitialisierung
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //hier wird überprüft, ob die Komponenten existieren
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

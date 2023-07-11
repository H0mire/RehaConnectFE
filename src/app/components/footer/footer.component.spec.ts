//Imports aus verschiedenen Libraries oder Frameworks
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  //Deklaration der Variablen component und fixture
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  //Funktion, die vor jedem einzelnen Test in diesem Teil ausgeführt wird
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  //Methode zur Initialisierung der Komponenten
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Methode zur Feststellung, ob die Komponenten erfolgreich erstellt wurden
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

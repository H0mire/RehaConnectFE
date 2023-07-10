//Importe aus den verschiedenen Libraries und Frameworks
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  //Konfiguration des Testmoduls und Kompilierung der Komponente vor dem Testen
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  //vor jedem Testfall wird eine Komponenteninstanz erstellt und die Initialisierung durchgeführt
  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Testfall zur Überprüfung, ob die Komponenten erstellt wurde
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

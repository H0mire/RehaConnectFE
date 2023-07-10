//Import aus den verschiedenen Libraries und Frameworks
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLayoutComponent } from './admin-layout.component';

//Component und Fixture werden deklariert
describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //hier wird überprüft, ob die component-Variable nicht null, undefined, false oder 0 ist
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

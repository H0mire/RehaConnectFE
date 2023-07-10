import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  //UserProfileComponent wird als zu testende Komponente festgelegt
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ]
    })
    .compileComponents();
  }));

  //Erstellung und Initialisierungsprozess der Komponente
  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   //Überprüfung ob Komponente erfolgreich erstellt wurde
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

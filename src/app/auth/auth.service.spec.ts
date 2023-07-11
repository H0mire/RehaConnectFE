// Erforderliche Module importieren
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

// Beschreibung der AuthService-Test-Suite 
describe('AuthService', () => {
  let service: AuthService;

  // Testumgebung vor jedem Test einrichten
  beforeEach(() => {
    // Testing-Modul konfigurieren
    TestBed.configureTestingModule({});

    // AuthService-Instanz aus dem Testing-Modul injecten
    service = TestBed.inject(AuthService);
  });

  // Testfall: Überprüfen, ob der Service erstellt wurde
  it('should be created', () => {
    // Erwarten, dass der Service nicht null oder undefiniert ist
    expect(service).toBeTruthy();
  });
});

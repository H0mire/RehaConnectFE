import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor  // Der AuthInterceptor wird als Provider bereitgestellt
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);  // Ein Objekt des AuthInterceptors wird erstellt
    expect(interceptor).toBeTruthy();  // Es wird überprüft, ob der Interceptor erfolgreich erstellt wurde
  });
});

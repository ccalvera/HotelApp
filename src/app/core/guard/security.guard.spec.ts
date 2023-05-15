import { SecurityGuard } from './security.guard';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SecurityGuard', () => {
  let securityGuard: SecurityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SecurityGuard],
    });
    securityGuard = TestBed.get(SecurityGuard);
  });

  it('should return true from canActivate', () => {
    expect(securityGuard.canActivate()).toBe(true);
  });
});

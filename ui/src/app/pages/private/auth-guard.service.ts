import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { SessionService } from 'app/client/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService
  ) { }

  canActivate(): boolean {
    return this.sessionService.isLoggedIn();
  }
}

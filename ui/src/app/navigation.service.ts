import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { find as _find_ } from 'lodash';

@Injectable()
export class NavigationService {
  constructor(
    private router: Router
  ) { }

  public goHome() {
    setTimeout(() => this.router.navigateByUrl('/'), 50);
  }

  public refreshPage() {
    const url = this.router.url;
    const fakeUrl = 'redirect';
    const redirectRoute = { path: fakeUrl };

    if (!_find_(this.router.config, redirectRoute)) {
      this.router.config.push(redirectRoute);
    }

    this.router.navigate([fakeUrl])
      .then(() => this.router.navigate([url])
        .then(() => {
          if (url !== this.router.url) {
            this.goHome();
          }
        }));
  }
}

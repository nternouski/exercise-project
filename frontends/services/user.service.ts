import { Injectable } from '@angular/core';

import { Auth, authState, signInAnonymously } from '@angular/fire/auth';

import {
  filter,
  switchMap,
  shareReplay,
  distinctUntilChanged,
} from 'rxjs/operators';


import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private auth: Auth) {}

  private isValid = <T>(a: T | null | undefined): a is T => a !== null && a !== undefined;

  public user = authState(this.auth).pipe(
    filter((u) => {
      if (!!u) {
        return true;
      } else {
        signInAnonymously(this.auth).catch(console.error);
        return false;
      }
    }),
    filter(this.isValid),
    distinctUntilChanged((u1, u2) => u1.uid === u2.uid),
    switchMap((u) =>
      u.getIdTokenResult().then(({ token }) => ({ authUser: u, token }))
    ),
    shareReplay(1)
  );
}

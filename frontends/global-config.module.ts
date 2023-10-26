import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FlexLayoutModule } from "@angular/flex-layout";

import { getApp, initializeApp, provideFirebaseApp } from "@angular/fire/app";
import {
  getFirestore,
  provideFirestore,
  connectFirestoreEmulator,
} from "@angular/fire/firestore";
import { provideAuth, getAuth, connectAuthEmulator } from "@angular/fire/auth";
import {
  getStorage,
  provideStorage,
  //  connectStorageEmulator
} from "@angular/fire/storage";

import { MatPaginatorModule } from "@angular/material/paginator";

import { UserService } from "@services/user.service";

import { environment } from "@environment";

@NgModule({
  declarations: [],
  imports: [
    MatPaginatorModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore(getApp());
      const localFirestore: {
        host: string | null;
        port: number | null;
        ssl: boolean;
      } = environment.localFirebase.firestore;
      if (!!localFirestore.host && !!localFirestore.port) {
        connectFirestoreEmulator(
          firestore,
          localFirestore.host,
          localFirestore.port
        );
      }
      return firestore;
    }),
    provideAuth(() => {
      const auth = getAuth(getApp());
      if (!!environment.localFirebase.auth)
        connectAuthEmulator(auth, environment.localFirebase.auth);
      return auth;
    }),
    provideStorage(() => {
      const storage = getStorage(getApp());
      // const localStorage: { host: string | null; port: number | null } = environment.localFirebase.storage;
      // if (!!localStorage.host && !!localStorage.port) {
      //   connectStorageEmulator(storage, localStorage.host, localStorage.port);
      // }
      return storage;
    }),
  ],
  exports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [UserService],
})
export class GlobalConfigModule {
  constructor() {}
}

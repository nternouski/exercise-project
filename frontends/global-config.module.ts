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
  MatPaginatorModule,
} from "@angular/material/paginator";

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

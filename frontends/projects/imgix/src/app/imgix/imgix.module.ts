import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { ImgixComponent } from "./imgix.component";
import { ImgixRoutingModule } from "./imgix-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

import { ImgixAngularModule } from "@imgix/angular";

const domains = [
  "assets.imgix.net",
  "test-app-img.imgix.net",
];

export const domainSelected = domains[0];

@NgModule({
  declarations: [ImgixComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    ImgixRoutingModule,
    MatDividerModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatSliderModule,
    MatSlideToggleModule,
    ClipboardModule,
    ImgixAngularModule.forRoot({
      domain: domainSelected,
      defaultImgixParams: { auto: "format,compress" },
    }),
  ],
})
export class ImgixModule {}

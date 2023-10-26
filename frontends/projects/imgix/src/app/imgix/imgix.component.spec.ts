import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";

import { GlobalConfigModule } from "global-config.module";

import { ImgixComponent } from "./imgix.component";

describe("ImgixComponent", () => {
  let component: ImgixComponent;
  let fixture: ComponentFixture<ImgixComponent>;

  beforeEach(async (done) => {
    await TestBed.configureTestingModule({
      declarations: [ImgixComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatDividerModule,
        MatInputModule,
        MatTooltipModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        GlobalConfigModule,
      ],
      providers: [],
    }).compileComponents();
    done();
  });

  beforeEach((done) => {
    fixture = TestBed.createComponent(ImgixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    done();
  });

  it("should create", (done) => {
    expect(component).toBeTruthy();
    done();
  });
});

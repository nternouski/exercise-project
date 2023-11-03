import { Component, ChangeDetectionStrategy } from "@angular/core";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, combineLatest } from "rxjs";
import { shareReplay, filter, map } from "rxjs/operators";

import { ImageService } from "@services/image.service";
import { StorageService } from "@services/storage.service";

import { Param, params } from "./params";

interface Form {
  image: FormControl<string>;
  param: FormControl<Param | null>;
  value: FormControl<string | null>;
  allowLiveChange: FormControl<boolean>;
}

interface Change {
  param: string;
  value: string;
}

export const isValid = <T>(a: T | null | undefined): a is T =>
  a !== null && a !== undefined;

@Component({
  selector: "imgix-app",
  templateUrl: "./imgix.component.html",
  styleUrls: ["./imgix.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgixComponent {
  public readonly params = params;

  public images = combineLatest([
    this.storageService.listAll("imgix"),
    this.imageService.getImages(),
  ]).pipe(map(([fromStorage, assets]) => [...fromStorage, ...assets]));

  public changes = new BehaviorSubject<{ history: Change[]; current: number }>({
    history: [],
    current: -1,
  });
  public changes$ = this.changes.asObservable().pipe(shareReplay(1));

  public formTransformation = new FormGroup<Form>({
    image: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    allowLiveChange: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    param: new FormControl(null, [Validators.required]),
    value: new FormControl(null, [Validators.required]),
  });

  public allowedValues =
    this.formTransformation.controls.param.valueChanges.pipe(
      filter(isValid),
      map((param) => param.options)
    );

  public componentData = combineLatest([
    this.formTransformation.valueChanges,
    this.changes,
  ]).pipe(
    filter(([form]) => !!form.image),
    map(([{ image, param, value, allowLiveChange }, changes]) => {
      let currentChanges = changes.history.slice(0, changes.current + 1);
      if (allowLiveChange && param && value) {
        currentChanges.push({ param: param.value, value: value });
      }
      currentChanges = currentChanges.reduce<Change[]>((acc, change) => {
        if (change.param === "rot") {
          const currentRotIdx = acc.findIndex((c) => c.param === "rot");
          if (currentRotIdx !== -1) {
            acc[currentRotIdx].value += change.value;
            return acc;
          }
        }
        acc.push(change);
        return acc;
      }, []);
      console.log(image);
      return `${image}?${currentChanges
        .map((change) => `${change.param}=${change.value}`)
        .join("&")}`;
    }),
    shareReplay(1)
  );

  constructor(
    private imageService: ImageService,
    private storageService: StorageService
  ) {}

  public onFileChange(event: Event) {
    const getExtension = (name: string) => {
      const dotsArray = name.split(".");
      return dotsArray[dotsArray.length - 1];
    };
    const files = (event.target as HTMLInputElement).files || [];
    Array.from<File>(files).map((file) => {
      const extension = getExtension(file.name);
      if (extension === "jpg" || extension === "png") {
        this.storageService.uploadFile("imgix", file).then(() => {
          console.log("File uploaded");
        });
      } else {
        console.log(`File not uploaded - ${extension} is not supported`);
      }
    });
  }

  public setValue(value: number | null, defaultValue?: number) {
    this.formTransformation.controls.value.setValue(
      String(value || defaultValue || 0)
    );
  }

  public addParam(
    form: FormGroup<Form>,
    changes: { history: Change[]; current: number }
  ) {
    const param = form.value.param?.value;
    const value = form.value.value;
    if (!param || !value) return;

    const currentChanges = changes.history.slice(0, changes.current + 1);
    this.changes.next({
      history: [...currentChanges, { param, value }],
      current: currentChanges.length,
    });
    this.formTransformation.controls.param.setValue(null);
    this.formTransformation.controls.value.setValue(null);
  }

  back(changes: { history: Change[]; current: number }) {
    if (changes.current === -1) return;
    this.changes.next({ ...changes, current: changes.current - 1 });
  }

  forward(changes: { history: Change[]; current: number }) {
    if (changes.current === changes.history.length - 1) return;
    this.changes.next({ ...changes, current: changes.current + 1 });
  }
}

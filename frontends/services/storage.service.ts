import { Injectable } from "@angular/core";
import {
  Storage,
  ref,
  listAll,
  uploadBytesResumable,
} from "@angular/fire/storage";

@Injectable({ providedIn: "root" })
export class StorageService {
  constructor(private storage: Storage) {}

  public listAll(path: string) {
    return listAll(ref(this.storage, path)).then((res) =>
      res.items.map((i) => ({ name: i.name, url: `https://test-app-img.imgix.net/${i.fullPath.split("/")[1]}` }))
    );
  }

  public uploadFile(folder: string, file: File) {
    return uploadBytesResumable(
      ref(this.storage, `${folder}/${file.name}`),
      file
    );
  }
}

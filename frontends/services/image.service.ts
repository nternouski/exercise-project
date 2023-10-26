import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ImageService {
  constructor(private http: HttpClient) {}

  private imageSandbox =
    "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json";

  public getImages() {
    return this.http
      .get<{ url: string; name: string }[]>(this.imageSandbox, {})
      .toPromise();
  }
}

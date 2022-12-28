import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AssetService<T> {
  constructor() {}

  getAll(filename: string): Observable<T> {
    return from(
      new Promise<T>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "./assets/" + filename);
        xhr.send();
        xhr.onreadystatechange = () => {
          try {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200 || xhr.status === 201) {
                resolve(JSON.parse(xhr.response));
              } else {
                reject(JSON.parse(xhr.responseText));
              }
            }
          } catch (err) {
            console.error(err);
          }
        };
      })
    );
  }
}

import { Injectable } from "@angular/core";

import { App } from "./application";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService {
  configurations: App[];

  constructor() {}

  getAll(): Promise<App[]> {
    return new Promise((resolve) =>
      this.configurations
        ? resolve(this.configurations)
        : resolve(
            new Promise<App[]>((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.open("GET", "./assets/applications.json");
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  if (xhr.status === 200 || xhr.status === 201) {
                    resolve(JSON.parse(xhr.response));
                  } else {
                    reject(JSON.parse(xhr.responseText));
                  }
                }
              };
            })
          )
    ).then((apps: App[]) => {
      apps = apps.filter(
        (app) =>
          !ConfigurationService.isEmpty(app.name) &&
          !ConfigurationService.isEmpty(app.icon)
      );
      apps
        .filter((app) => ConfigurationService.isEmpty(app.url))
        .forEach((app) => (app.url = app.name.toLowerCase()));
      return apps;
    });
  }

  private static isEmpty(str: string): boolean {
    return !str || str.trim() === "";
  }
}

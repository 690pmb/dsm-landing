import { Injectable } from "@angular/core";
import { map, of } from "rxjs";

import { App } from "./application";
import { AssetService } from "./asset.service";

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  applications: App[];

  constructor(private assetService: AssetService<App[]>) {}

  getAll(): Promise<App[]> {
    return (
      this.applications
        ? of(this.applications)
        : this.assetService.getAll("applications.json")
    )
      .pipe(
        map((apps: App[]) => {
          apps = apps.filter(
            (app) =>
              !ApplicationService.isEmpty(app.name) &&
              !ApplicationService.isEmpty(app.icon)
          );
          apps
            .filter((app) => ApplicationService.isEmpty(app.url))
            .forEach((app) => (app.url = app.name.toLowerCase()));
          return apps;
        })
      )
      .toPromise();
  }

  private static isEmpty(str: string): boolean {
    return !str || str.trim() === "";
  }
}

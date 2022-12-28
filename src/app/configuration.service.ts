import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AssetService } from "./asset.service";
import { Configuration } from "./configuration";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService {
  private configuration: Configuration;

  constructor(private assetService: AssetService<Configuration>) {}

  getConfiguration(): Observable<Configuration> {
    return this.configuration
      ? of(this.configuration)
      : this.assetService.getAll("configuration.json");
  }
}

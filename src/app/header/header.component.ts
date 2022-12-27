import { Component } from "@angular/core";
import { ConfigurationService } from "../configuration.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  title!: string;

  constructor(configurationService: ConfigurationService) {
    configurationService
      .getConfiguration()
      .subscribe((conf) => (this.title = conf.title));
  }
}

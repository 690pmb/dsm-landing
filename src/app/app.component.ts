import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ConfigurationService } from "./configuration.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  date!: string;

  constructor(titleService: Title, configurationService: ConfigurationService) {
    configurationService.getConfiguration().subscribe((conf) => {
      titleService.setTitle(conf.title);
      this.date = conf.date;
    });
  }
}

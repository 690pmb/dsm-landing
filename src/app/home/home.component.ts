import { Component, OnInit } from "@angular/core";
import { App } from "./../application";
import { ApplicationService } from "../application.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  apps: App[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.applicationService
      .getAll()
      .then((apps) => (this.apps = apps))
      .catch((err) =>
        console.error("Error while getting configuration file", err)
      );
  }
}

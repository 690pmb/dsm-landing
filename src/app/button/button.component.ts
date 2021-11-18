import { Component, Input, OnInit } from "@angular/core";

import { App } from "../application";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() app: App;

  constructor() {}

  ngOnInit() {
    if (!this.app.url.includes("http")) {
      this.app.url = `https://${this.app.url}${environment.baseUrl}`;
    }
    this.app.icon = this.app.icon.includes(" ")
      ? this.app.icon
      : `fas fa-${this.app.icon}`;
  }
}

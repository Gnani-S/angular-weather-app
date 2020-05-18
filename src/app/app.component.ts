import { Component, OnInit } from "@angular/core";
import { WeatherDataService } from "./common/services/weather-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  selectedCity: string;
  constructor(private weatherService: WeatherDataService) {}
  ngOnInit() {
    this.weatherService.feedCountry.subscribe((city) => {
      this.selectedCity = city;
    });
  }
}

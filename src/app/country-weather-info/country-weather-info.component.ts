import { Component, OnInit, Input } from "@angular/core";
import { WeatherDataService } from "../common/services/weather-data.service";

@Component({
  selector: "country-weather-info",
  templateUrl: "./country-weather-info.component.html",
  styleUrls: ["./country-weather-info.component.css"],
})
export class CountryWeatherInfoComponent implements OnInit {
  @Input() cityName: string;
  icon: string = "assets/weather-icons/cloudy-day-1.svg";
  data: any;
  reload: string = "assets/btn-icons/reload.svg";

  constructor(private weatherService: WeatherDataService) {}

  ngOnInit() {
    console.log("cityName" + this.cityName)
    this.weatherService.fetchData(this.cityName).subscribe((response) => {
      this.data = {cityName:response.city.name,
        cityTemp:response.list[0].main.temp,cityPressure:response.list[0].main.pressure,
        cityWeather:response.list[0].weather[0].description,cityWind:response.list[0].wind,
      cityPastList:response.list};
    });
  }
}

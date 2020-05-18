import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { WeatherDataService } from "../common/services/weather-data.service";
import { countries } from '../common/interface/weatherData.model';
import { map } from 'rxjs/operators';
@Component({
  selector: "country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.css"],
})
export class CountryListComponent implements OnInit {
  @ViewChild("inputCountry") countryInput: ElementRef<HTMLInputElement>;
  @ViewChild("removeCountry") removeCtr: ElementRef<HTMLInputElement>;
  city: string = "";
  countryData: any;
  error: string;
  countries: Array<countries> = [];
  btn: object = {
    add: "assets/btn-icons/addSign.svg",
    remove: "assets/btn-icons/cancelSign.svg",
    reload: "assets/btn-icons/reload.svg",
  };

  constructor(private weatherService: WeatherDataService) {}

  ngOnInit() {}

  addCountry() {
    this.city = this.countryInput.nativeElement.value;
    this.weatherService.fetchData(this.city).subscribe(
      (response) => {
        this.countryData = response;
        console.log(this.countryData);
      },
      (error) => {
        this.error = error.error.message;
      }
    );
    if (this.countries.length > 7) {
      this.countries.pop();
      setTimeout(() => {
        this.countries.unshift(this.countryData.city.name);
      }, 1000);
    } else {
      setTimeout(() => {
        this.countries.unshift({cityName:this.countryData.city.name,
          cityTemp:this.countryData.list[0].main.temp,
          cityWeather:this.countryData.list[0].weather[0].description});
      }, 1000);
      console.log(this.countries)
    }
  }
  
  countryDetais(index) {
    console.log("index =" + index)
    this.weatherService.feedCountry.emit(this.countries[index].cityName)
  }

  reloadCountry(index) {
    alert("The update is done once in 3 hours")
    let refreshData;
    this.weatherService.fetchData(this.countries[index]).subscribe(
      (response) => {
        refreshData = {cityName:response.city.name,
        cityTemp:response.list[0].main.temp,
        cityWeather:response.list[0].weather[0].description
      };
        console.log("refreshData", refreshData);
      },
      (error) => {}
    );
  }

  removeCountry(index) {
    this.countries.splice(index,1);
  }

  clearList() {
    this.countries = [];
  }
}

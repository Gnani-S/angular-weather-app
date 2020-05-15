import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { WeatherDataService } from '../common/services/weather-data.service';

@Component({
  selector: "country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.css"],
})
export class CountryListComponent implements OnInit {
  @ViewChild("inputCountry") countryInput: ElementRef<HTMLInputElement>;
  @ViewChild("removeCountry") removeCtr: ElementRef<HTMLInputElement>;
  country: string;
  countries: Array<string> = [];
  btn: object = {
    add: "assets/btn-icons/addSign.svg",
    remove: "assets/btn-icons/cancelSign.svg",
    reload: "assets/btn-icons/reload.svg",
  };

  constructor(private weatherData:WeatherDataService) {}

  ngOnInit() {
    // this.weatherData.fetchData().subscribe((response)=>{console.log("response",response)},(error)=>{console.log("error",error)})
  }

  addCountry() {
    this.weatherData.feedCountry.emit(this.country);
    this.weatherData.fetchData().subscribe((response)=>{console.log("response",response)},(error)=>{console.log("error",error)})
    this.country = this.countryInput.nativeElement.value;
    if (this.countries.length > 7) {
      this.countries.pop()
      this.countries.unshift(this.country);
    } else {
      this.countries.unshift(this.country);
    }
    // console.log("Countries", this.countries);
    // console.log("country", this.country);
    // console.log("countryInput", this.countryInput);
  }

  reloadCountry() {
    
  }

  removeCountry() {
    let x = this.removeCtr.nativeElement.innerHTML;
    console.log("Remove" + x);
  }

  clearList() {
    this.countries = [];
  }
}

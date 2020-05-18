import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {  WeatherDataService } from '../common/services/weather-data.service';
@Component({
  selector: "country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.css"],
})
export class CountryListComponent implements OnInit {
  @ViewChild("inputCountry") countryInput: ElementRef<HTMLInputElement>;
  @ViewChild("removeCountry") removeCtr: ElementRef<HTMLInputElement>;
  country: string = "";
  countryData: any;
  countries: Array<string> = [];
  btn: object = {
    add: "assets/btn-icons/addSign.svg",
    remove: "assets/btn-icons/cancelSign.svg",
    reload: "assets/btn-icons/reload.svg",
  };

  constructor(private weatherService:WeatherDataService) {}

  ngOnInit() {
  }

  addCountry() {
    this.country = this.countryInput.nativeElement.value;
    this.weatherService.feedCountry.emit(this.country);
    this.weatherService.fetchData()
      .subscribe((response)=>{this.countryData = response.city.name;},
      (error)=>{});
    if (this.countries.length > 7) {
      this.countries.pop()
      this.countries.unshift(this.countryData);
    } else {
      setTimeout(()=>{this.countries.unshift(this.countryData)},1000);
    }
  }

  reloadCountry() {
    let refreshData;
    this.weatherService.fetchData()
      .subscribe((response)=>{refreshData = response;
      console.log("refreshData",refreshData)},
      (error)=>{});
  }

  removeCountry() {
    let x = this.removeCtr.nativeElement.innerHTML;
    console.log("Remove" + x);
  }

  clearList() {
    this.countries = [];
  }
}

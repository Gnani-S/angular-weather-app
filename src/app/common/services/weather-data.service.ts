import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { WeatherData } from '../interface/weatherData.model';

@Injectable({
  providedIn: "root",
})
export class WeatherDataService {
  feedCountry = new EventEmitter<String>();
  url = "http://api.openweathermap.org/data/2.5/forecast?q=";
  appId = "&appid=c51223c219d6aec8cb8c5210449bd859";

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  fetchData(city):Observable<WeatherData> {
    return this.http.get<WeatherData>(this.url + city + this.appId,{observe:"response"}).pipe(
      map(response=>response.body),
      catchError(this.errorHandler));
  }

  private errorHandler(errorResponse:HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent){
      alert(errorResponse.error);
    }
    return throwError(errorResponse)
  } 
}

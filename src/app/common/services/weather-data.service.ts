import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from 'rxjS';

@Injectable({
  providedIn: "root",
})
export class WeatherDataService {
  feedCountry = new EventEmitter<any>();
  countryName: string;
  url = "http://api.openweathermap.org/data/2.5/weather?q=";
  appId = "&appid=c51223c219d6aec8cb8c5210449bd859";

  constructor(private http: HttpClient) {}

  fetchData():Observable<any> {
    return this.http.get(this.url + this.countryName + this.appId).pipe(catchError(this.errorHandler));
  }

  private errorHandler(errorResponse:HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent){
      alert(errorResponse.error);
    }
    return Observable.throw(errorResponse)
  } 
}

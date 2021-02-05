import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Summary } from './summary.model';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private _http: HttpClient
  ) { }
  
  dailyForecastCountry(data:any){
       var k=data.country;
  //  console.log("https://corona.lmao.ninja/v2/historical/"+k+"?lastdays=7");
    return this._http.get("https://corona.lmao.ninja/v2/historical/"+k+"?lastdays=7").pipe(map(result => result));
  }
  totalSummoryCountry(data:any){
    var i=data.country;
    return this._http.get("https://corona.lmao.ninja/v2/historical/"+i).pipe(map(result => result));
  }

  dailyForecast(){
    return this._http.get("https://corona.lmao.ninja/v2/historical/all?lastdays=7").pipe(map(result => result));
  }
  totalSummory(){
    return this._http.get("https://corona.lmao.ninja/v2/historical/all").pipe(map(result => result));
  }
  getSummary(){
    return this._http.get<Summary[]>("https://api.covid19api.com/summary").pipe(map(result => result));   

  }
}

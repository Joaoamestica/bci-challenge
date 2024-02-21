import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  findAll()
  {
    let headers = new HttpHeaders(
      {
        //'Authorization': localStorage.getItem("token") 
        'X-RapidAPI-Key': 'c181efda7amsh610262720e11d16p109ca8jsnf58b31aca3fe',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      });
    //return this.http.get<any>(environment.apiEndpoint + "/teams", { headers });
    return this.http.get<any>(environment.apiJsonServer + "/teams");
    
  }
}

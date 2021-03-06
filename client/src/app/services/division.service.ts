import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { FilterService } from '../services/filter.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: "root",
})
export class DivisionService {
  //returns and sorts all divisions
  getDivisionInfo() {
    let turl = "/division/get/all";
    return this.cache.getCached(turl, this.httpService.httpGet(turl, []).pipe(
      map((res) => {
        let divisionArr = res;
        divisionArr = divisionArr.sort((a, b) => {
          return this.fs.arrangeDivisions(a, b);
        });
        return divisionArr;
      })
    ));
  }

  //return division given a team name:
  getDivisionTeam(teamName: string): Observable<any> {
    let url = "/division/get/by/teamname";
    let parameters = [{ teamName: encodeURIComponent(teamName) }];
    return this.httpService.httpGet(url, parameters);
  }

  //returns division information of provided division; divisionConcat
  getDivision(divisionName: string): Observable<any> {
    let url = "/division/get";
    let parameters = [{ division: divisionName }];
    return this.httpService.httpGet(url, parameters);
  }

  //
  getDivisionAny(divInfo: string): Observable<any> {
    let url = "/division/get/any";
    let parameters = [{ q: encodeURIComponent(divInfo) }];
    return this.httpService.httpGet(url, parameters);
  }

  constructor(
    private httpService: HttpService,
    private fs: FilterService,
    private cache:CacheService
  ) {}
}

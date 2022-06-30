import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class OpOrgService {

  constructor(private http: HttpService, private auth: AuthService) { }

  saveOpOrg(org){
    let url = 'api/admin/upsertOpOrg';
    return this.http.httpPost(url, {opOrg:org}, true);
  }

  getOpOrg(query){
    let url = "api/opOrg/fetch/oporg";
    return this.http.httpPost(url, {query:query});
  }

  getAllOpOrgs(){
    let url = 'api/opOrg/get/alloporgs';
    return this.http.httpGet(url,[]);
  }




}

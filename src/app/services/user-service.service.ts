import { Injectable } from '@angular/core';
import { HttpClient  } from "@angular/common/http";
import { Router  } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Settings } from '../shared/settings';

@Injectable()
export class UserServiceService {

  constructor(private http : HttpClient, private router : Router) { }

  updateUserProfile(userInfo : any) : Observable<any>
  {
    let url = Settings.ApiBaseUrl + '';
    return this.http.post(url, userInfo);
  }

}

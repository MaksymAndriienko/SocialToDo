import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  public token: String;
  userID: String;
  profileInformation: string[];

  constructor(private http:Http) {
    this.userID = localStorage.getItem('id_token');
    this.profileInformation = [];
  }

  getCountById(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile/' + id)
    .map(res => res.json());
  }
  
  getCountByName(name){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile/' + name)
    .map(res => res.json());
  }

  getInformationProfile(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile/' + this.userID)
    .map(res => res.json());
  }

  getTasksProfile(pageToShow){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/task/gettasks/' + this.userID + '/' + pageToShow)
    .map(res => res.json());
  }

  getInformationProfileAnother(usernameShow){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile/another/' + usernameShow)
    .map(res => res.json());
  }

  getTasksProfileAnother(usernameShow, pageToShow){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/task/gettasks/another/' + usernameShow + '/' + pageToShow)
    .map(res => res.json());
  }

}

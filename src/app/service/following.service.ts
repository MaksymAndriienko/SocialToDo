import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class FollowingService {

  constructor(private http:Http) { }

  addNewFollower(newFollower){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/follower/new/', JSON.stringify(newFollower), {headers: headers}).subscribe();
  }

  cheakFollower(Follower){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/follower/cheak', JSON.stringify(Follower), {headers: headers});
  }

}

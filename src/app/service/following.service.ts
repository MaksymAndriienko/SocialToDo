import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class FollowingService {

  constructor(private http:Http) { }

  addNewFollower(newFollower){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/follower/new/', JSON.stringify(newFollower), {headers: headers})
    .map(res => res.json());
  }

  cheakFollower(Follower){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/follower/cheak', JSON.stringify(Follower), {headers: headers});
  }


  getUsers(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/follower/getuser', JSON.stringify({token: localStorage.getItem('id_token')}), {headers: headers})
      .map(res => res.json());
  }

}

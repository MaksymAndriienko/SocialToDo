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

  deleteFollowing(Following){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/follower/delete', JSON.stringify(Following), {headers: headers})
    .map(res => res.json());
  }

  getUsers(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/follower/getuser', JSON.stringify({token: localStorage.getItem('id_token')}), {headers: headers})
      .map(res => res.json());
  }

  getUsersBySearch(searchQuery){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/finduser', JSON.stringify({token: localStorage.getItem('id_token'), name: searchQuery}), {headers: headers})
      .map(res => res.json());
  }

  getFollowing(username){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/findfollowing', JSON.stringify({token: localStorage.getItem('id_token'), username: username}), {headers: headers})
      .map(res => res.json());
  }

  getFollowers(username){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/findfollowers', JSON.stringify({token: localStorage.getItem('id_token'), username: username}), {headers: headers})
      .map(res => res.json());
  }

}

import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  public token: String;

  constructor(private http:Http) {}

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  storeUserToken(token){
    localStorage.setItem('currentUser', JSON.stringify(token));
  }

  addNewUser(newUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/signup', JSON.stringify(newUser), {headers: headers}).subscribe();
  }

  loginUser(user){
    console.log(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/authentication', JSON.stringify(user), {headers: headers})
      .map(res => res.json())
      .subscribe(
      data => localStorage.setItem('id_token', data.token),
      error => console.log(error)
    );
  }

}

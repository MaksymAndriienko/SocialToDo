import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  public token: String;

  constructor(private http:Http) {}

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
      data => localStorage.setItem('currentUser', data.token),
      error => console.log(error)
    );
  }

}

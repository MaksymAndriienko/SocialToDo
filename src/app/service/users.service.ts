import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Injectable()
export class UsersService {
  public token: String;
  constructor(private http:Http, private router: Router, public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

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

  controleError(data){
    if(data.success){
      localStorage.setItem('id_token', data.token);
      this.toastr.success(data.msg, 'Success!');
      this.router.navigate(['/']);
    }
    else{
      this.toastr.error(data.msg, 'Oops!');
    }
  }

  loginUser(user){
    console.log(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/authentication', JSON.stringify(user), {headers: headers})
      .map(res => res.json())
      .subscribe(
      data => {
        this.controleError(data)
      },
      error => console.log(error)
    );
  }

  logout(){
    localStorage.removeItem('id_token');
    this.router.navigate(['/']);
  }

}

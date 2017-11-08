import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class EditprofileService {

  userID: String;
  constructor(private http:Http) { 
    this.userID = localStorage.getItem('id_token');
  }

  saveEditProfile(editProfile){
    
  }

  getInformetionProfie(){
    console.log(this.userID);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile/' + this.userID)
    .map(res => res.json());
  }

}

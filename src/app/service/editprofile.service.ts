import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class EditprofileService {

  userID: String;
  constructor(private http:Http) { 
    this.userID = localStorage.getItem('id_token');
  }

  saveEditProfile(editProfile){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/profile/edit/' + editProfile._id, JSON.stringify(editProfile), {headers: headers}).subscribe();
  }

  getInformetionProfie(){
    console.log(this.userID);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile/' + this.userID)
    .map(res => res.json());
  }

  saveEditImageProfile(editImageProfile){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/profile/edit/image/' + editImageProfile._id, JSON.stringify(editImageProfile), {headers: headers}).subscribe();
  }

}

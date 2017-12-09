import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class UploadImageService {

  constructor(private http:Http) {}

  uploadImage(imageEncode){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/image', JSON.stringify(imageEncode), {headers: headers}).map(res => res.json());
  }

}

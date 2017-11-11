import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class NewsService {

  constructor(private http:Http) {}

  getTasksNews(idUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/news/getnews', JSON.stringify(idUser), {headers: headers});
  }
}

import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class GoalService {
  public token: String;
  constructor(private http:Http, public toastr: ToastsManager) {
    
  }

  controleError(data){
    if(data.success){
      this.toastr.success(data.msg, 'Success!');
    }
    else{
      this.toastr.error(data.msg, 'Oops!');
    }
  }

  addLike(idTask){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/task/like', JSON.stringify({id: idTask, id_user: localStorage.getItem('id_token')}), {headers: headers})
    .map(res => res.json());
  }

  addNewGoal(newGoal){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/task/api', JSON.stringify(newGoal), {headers: headers})
    .map(res => res.json())
    .subscribe(
      data => {
        this.controleError(data);
      },
      error => console.log(error)
    );
  }

}

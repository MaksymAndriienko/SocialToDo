import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AvatarService {
  private subject = new Subject<any>();

  sendDataAvatar(avatar: string){
    this.subject.next({avatar: avatar});
  }

  getDataAvatar(): Observable<any>{
    return this.subject.asObservable();
  }
}

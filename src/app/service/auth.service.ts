import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UsersService } from './users.service';

@Injectable()
export class AuthService implements CanActivate{

  constructor(private user: UsersService, private router: Router) {}
  
  canActivate() {
    if(this.user.loggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/unauthorized');
      return false;
    }
  }

}

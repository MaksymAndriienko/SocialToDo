import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent {
  username: String;
  password: String;
  constructor (private userService: UsersService){
    console.log('Form login user');
  }

  loginUser(event){
    event.preventDefault();
    console.log('Login...');
    var user = {
      username: this.username,
      password: this.password
    }
    this.userService.loginUser(user);
  }

}

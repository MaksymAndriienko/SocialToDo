import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  username: String;
  password: String;
  firstname: String;
  lastname: String;
  gender: String;
  email: String;
  avatar: String;


  constructor (private userService: UsersService){
    console.log('Form adding new user');
  }

  addNewUser(event){
    event.preventDefault();
    var newUser = {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      gender: this.gender,
      email: this.email
    }
    this.userService.addNewUser(newUser);
  }

}

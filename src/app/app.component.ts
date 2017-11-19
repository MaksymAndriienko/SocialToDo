import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {UsersService} from './service/users.service';
import { ProfileService } from './service/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent {
  constructor( private userService: UsersService, public toastr: ToastsManager, vcr: ViewContainerRef, private profileService: ProfileService) {
    this.toastr.setRootViewContainerRef(vcr);

    this.getData();
  }

  user = {
    _id: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    about: String,
    birthday: String,
    languages: String,
    lives: String,
    from: String,
    gender: String,
    email: String,
    avatar: String
  };

  getData(){
    this.profileService.getInformationProfile().subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }

  title = 'app';
}

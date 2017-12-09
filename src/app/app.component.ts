import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {UsersService} from './service/users.service';
import { ProfileService } from './service/profile.service';
import {Router, NavigationExtras} from "@angular/router";
import { AvatarService } from './service/common/avatar.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent {
  avatar: any;
  subscription: Subscription;
  constructor( private userService: UsersService, 
                public toastr: ToastsManager, 
                private avatarService: AvatarService,
                vcr: ViewContainerRef, 
                private profileService: ProfileService,
                private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.getData();
    this.getAvatar();
    this.subscription = this.avatarService.getDataAvatar().subscribe(data => {this.avatar = data.avatar});
  }

  searchQuery: String;

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
  
  getAvatar(){
    this.avatar = localStorage.getItem('avatar');
  }
  
  getData(){
    this.profileService.getInformationProfile().subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }

  findUsers(event){
    event.preventDefault();
    let navextras: NavigationExtras={            
      queryParams:{"searchQuery": this.searchQuery}
    };
    this.router.navigate(['/user-list/search'], navextras);
  }

  title = 'app';
}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    _id: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    gender: String,
    email: String,
    avatar: String
  };

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getInformationProfile().subscribe(
      data => this.user = data,
      error => console.log(error)
    );;
  }

  showUser(){
    console.log(this.user);
  }

}

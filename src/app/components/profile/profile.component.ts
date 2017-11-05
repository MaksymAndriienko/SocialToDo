import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    about: String,
    birthday: String,
    languages: String,
    lives: String,
    from: String,
    gender: String,
    email: String,
    avatar: String
  };

  tasks: any = [];

  usernameShow: String

  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usernameShow = params['username'];
    });
    
    if(!this.usernameShow){
      this.profileService.getInformationProfile().subscribe(
        data => this.user = data,
        error => console.log(error)
      );
      this.profileService.getTasksProfile().subscribe(
        data => this.tasks = data,
        error => console.log(error)
      );
    }
    else{
      this.profileService.getInformationProfileAnother(this.usernameShow).subscribe(
        data => this.user = data,
        error => console.log(error)
      );
      this.profileService.getTasksProfileAnother(this.usernameShow).subscribe(
        data => this.tasks = data,
        error => console.log(error)
      );
    }
  }

}

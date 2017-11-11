import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../service/profile.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as _ from 'lodash'

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

  finished = false;
  pages = 1;
  tasks: any = [];

  usernameShow: String

  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  inview() {
    console.log('inview!!');
    this.getTask();
  }

  private getTask(){
    if (this.finished) return;

    if(this.usernameShow){
      this.profileService.getTasksProfileAnother(this.usernameShow, this.pages).subscribe(
        data => {
          this.tasks = this.tasks.concat(data);
          this.finished = false;
          this.pages += 1;
        },
        error => console.log(error)
      );
    }
    else{
      this.profileService.getTasksProfile(this.pages).subscribe(
        data => {
          this.tasks = this.tasks.concat(data);
          this.finished = false;
          this.pages += 1;
        },
        error => console.log(error)
      );
    }
    console.log(this.tasks);
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.usernameShow = params['username'];
    });
    
    this.getTask();

    if(!this.usernameShow){
      this.profileService.getInformationProfile().subscribe(
        data => this.user = data,
        error => console.log(error)
      );
    }
    else{
      this.profileService.getInformationProfileAnother(this.usernameShow).subscribe(
        data => this.user = data,
        error => console.log(error)
      );
    }
  }

}

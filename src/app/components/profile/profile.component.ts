import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { FollowingService } from '../../service/following.service';


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
  countFollower = 0;
  countFollowing = 0;
  countGoals = 0;

  usernameShow: String;
  isFollower: Boolean = false;

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private followingService: FollowingService) { }

  follower(){
    var newFollower = {
      userFollowing: this.usernameShow,
      idFollower: localStorage.getItem('id_token')
    }
    this.followingService.addNewFollower(newFollower);
  }

  getCount(){
    if(localStorage.getItem('id_tokem')){
      this.profileService.getCountById(localStorage.getItem('id_tokem')).subscribe(
        data => {
  
        },
        error => console.log(error)
      );
    }
    else{
      this.profileService.getCountByName(this.usernameShow).subscribe(
        data => {
  
        },
        error => console.log(error)
      );
    }
  }

  checkFollower(){
    var Follower = {
      userFollowing: this.usernameShow,
      idFollower: localStorage.getItem('id_token')
    }
    this.followingService.cheakFollower(Follower)
    .map(res => res.json())
    .subscribe(
      data => {
        this.isFollower = data.success;
      },
      error => console.log(error)
    );
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('ENd!!');
        this.getTask();
      }
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

    this.checkFollower();
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

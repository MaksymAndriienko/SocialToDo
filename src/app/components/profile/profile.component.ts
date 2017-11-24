import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { GoalService } from '../../service/goal.service';
import { FollowingService } from '../../service/following.service';
import {Router, NavigationExtras} from "@angular/router";


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

  count = {
    countFollower: {
      type: Number,
      default: 0
    },
    countFollowing: {
      type: Number,
      default: 0
    },
    countGoals:{
      type: Number,
      default: 0
    }
  }

  likeCheacker = [];
  finished = true;
  pages = 1;
  tasks: any = [];
  countFollower = 0;
  countFollowing = 0;
  countGoals = 0;
  ffilter = false;
  dfilter = false;

  usernameShow: String;
  myUsernameShow: String;
  isFollower: Boolean = false;

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute, 
              private followingService: FollowingService,
              private goalService: GoalService,
              private router: Router) { }

  addLike(task){
    console.log(task.likes)
    this.goalService.addLike(task._id).subscribe(
      data => {
        if(data.success == true){
          task.isLike = data.taskLike;
        }
      },
      error => console.log(error)
    );

  }

  follower(){
    var newFollower = {
      userFollowing: this.usernameShow,
      idFollower: localStorage.getItem('id_token')
    }
    this.followingService.addNewFollower(newFollower).subscribe();
  }

  editGoal(task){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          task: task
      }
  };
    this.router.navigate(['edit-goal', navigationExtras]);
  }

  getCount(){
    if(!this.usernameShow){
      this.profileService.getCountByName(this.myUsernameShow).subscribe(
        data => {
          this.count.countFollower = data.countFollower;
          this.count.countFollowing = data.countFollowing;
          this.count.countGoals = data.countGoals;
          console.log(data);
        },
        error => console.log(error)
      );
    }
    else{
      this.profileService.getCountByName(this.usernameShow).subscribe(
        data => {
          this.count.countFollower = data.countFollower;
          this.count.countFollowing = data.countFollowing;
          this.count.countGoals = data.countGoals;
          console.log(data);
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
    this.finished = false;
    if (this.tasks.length == this.count.countGoals){
      this.finished = true;
      return;
    }
    if(this.usernameShow){
      this.profileService.getTasksProfileAnother(this.usernameShow, this.pages, localStorage.getItem('id_token')).subscribe(
        data => {
          this.tasks = this.tasks.concat(data);
          this.finished = true;
          this.pages += 1;
        },
        error => console.log(error)
      );
    }
    else{
      this.profileService.getTasksProfile(this.pages).subscribe(
        data => {
          this.tasks = this.tasks.concat(data);
          this.finished = true;
          this.pages += 1;
        },
        error => console.log(error)
      );
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usernameShow = params['username'];
    });

    this.myUsernameShow = localStorage.getItem('username');

    this.checkFollower();
    this.getTask();
    this.getCount();

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

  // filter(divToShow){
  //   this.progressBool = divToShow;
  //   if(divToShow == true){
  //     this.proces = "Done";
  //   }
  //   else{
  //     this.proces = "In the process";
  //   }
  // }

}

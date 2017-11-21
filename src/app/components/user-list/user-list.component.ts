import { Component, OnInit } from '@angular/core';
import { FollowingService } from '../../service/following.service';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];

  constructor(private followingService: FollowingService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.followingService.getUsers().subscribe(
      data => {
        this.users = this.users.concat(data);
      },
      error => console.log(error)
    );
  }

  follower(user){
    if(user.reletions.length == 0){
      var newFollower = {
        userFollowing: user.username,
        idFollower: localStorage.getItem('id_token')
      }
      this.followingService.addNewFollower(newFollower).subscribe(
        data => {
          user.reletions = data.user.reletions;
        }
      );
    }
    else{
      user.reletions.length = 0;
    }
    console.log(user.reletions.length);
  }
}

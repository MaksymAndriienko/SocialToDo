import { Component, OnInit } from '@angular/core';
import { FollowingService } from '../../service/following.service';

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

}

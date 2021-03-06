import { Component, OnInit } from '@angular/core';
import { FollowingService } from '../../service/following.service';
import { Input } from '@angular/core/src/metadata/directives';
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  searchQuery: String;
  tree: UrlTree;
  g: UrlSegmentGroup;
  s: UrlSegment[];

  constructor(private followingService: FollowingService, 
              private route: ActivatedRoute,
              public toastr: ToastsManager,
              private router: Router) {
     this.tree = router.parseUrl(this.router.url);
     this.g = this.tree.root.children[PRIMARY_OUTLET];
     this.s = this.g.segments;
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['searchQuery'];
      if(this.searchQuery != undefined && this.s[1].path == 'search'){
        this.getUserBySearch();
      }
      else if(this.s[0].path == 'following'){
        this.followingService.getFollowing(this.s[1].path).subscribe(
          data => {
            this.users = data;
          },
          error => console.log(error)
        )
      }
      else if(this.s[0].path == 'followers'){
        this.followingService.getFollowers(this.s[1].path).subscribe(
          data => {
            this.users = data.data;
          },
          error => console.log(error)
        )
      }
      else{
        this.getUsers();
      }
    });
  }

  ngOnInit() {
  }

  getUserBySearch(){
    this.followingService.getUsersBySearch(this.searchQuery).subscribe(
      data => {
        this.users = data;
      },
      error => console.log(error)
    )
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
          this.toastr.success("You follow this user", 'Success!');
        }
      );
    }
    else{
      var Following = {
        _id: user._id,
        idFollower: localStorage.getItem('id_token')
      }
      this.followingService.deleteFollowing(Following).subscribe(
        data => {
          user.reletions = data.user.reletions;
          this.toastr.error('You unfollow this user', 'Success!')
        }
      )
    }
  }
}

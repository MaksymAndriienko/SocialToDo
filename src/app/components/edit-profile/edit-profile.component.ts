import { Component, OnInit } from '@angular/core';
import { EditprofileService } from '../../service/editprofile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  user = {
    _id: String,
    firstname: String,
    lastname: String,
    about: String,
    birthday: String,
    languages: String,
    lives: String,
    from: String,
    avatar: String
  };

  constructor(private editprofileService: EditprofileService) { 
    this.getEditProfie();
  }

  getEditProfie(){
    this.editprofileService.getInformetionProfie().subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }

  updateProfile(user){
    console.log(user);
    this.editprofileService.saveEditProfile(user);
  }

}

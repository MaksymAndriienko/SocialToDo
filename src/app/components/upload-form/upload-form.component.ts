import { Component, ViewChild} from '@angular/core';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { UploadImageService } from '../../service/upload-image.service';
import { EditprofileService } from '../../service/editprofile.service';
import {AvatarService} from '../../service/common/avatar.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {

  data: any;
  cropperSettings: CropperSettings;
  
  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;

  constructor(private uploadImageService: UploadImageService, private avatarService: AvatarService) {
      this.setDefaultImage();
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;
      this.cropperSettings.width = 200;
      this.cropperSettings.height = 200;
      this.cropperSettings.croppedWidth = 200;
      this.cropperSettings.croppedHeight = 200;
      this.cropperSettings.canvasWidth = 400;
      this.cropperSettings.canvasHeight = 400;
      this.data = {};
  }
  
  setDefaultImage(){
    var image:HTMLImageElement = new Image();
    image.src ='/assets/image/dress.jpg';
    image.addEventListener('load', (data) => {
        this.cropper.setImage(image);
    });
    console.log(image);
  }

  ImagesUpload(){
    var dataImg = {
      data: this.data,
      token: localStorage.getItem('id_token')
    };
    this.uploadImageService.uploadImage(dataImg).subscribe(
      data => {
        if(data.success == true){
          localStorage.setItem('avatar', data.avatar);
          this.avatarService.sendDataAvatar(data.avatar);
        }
      },
      error => console.log(error)
    );
  }

  fileChangeListener($event) {
      var image:any = new Image();
      var file:File = $event.target.files[0];
      var myReader:FileReader = new FileReader();
      var that = this;
      myReader.onloadend = function (loadEvent:any) {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);
  
      };
  
      myReader.readAsDataURL(file);

  }
}

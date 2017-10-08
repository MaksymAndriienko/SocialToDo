import { Component, ViewChild } from '@angular/core';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';


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

  constructor() {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;
      this.data = {};
  }
  
  ImagesUpload($event){
    var dataImg = {
      data: this.data
    }
    console.log(dataImg);
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, CanActivate} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ImageCropperComponent} from 'ng2-img-cropper';
import { AuthService } from './service/auth.service';
import { UsersService } from './service/users.service';
import { UploadImageService } from './service/upload-image.service';
import { ProfileService } from './service/profile.service';
import { AppComponent } from './app.component';
import { SingupComponent } from './components/singup/singup.component';
import { SinginComponent } from './components/singin/singin.component';
import { HiddenpageComponent } from './components/hidden-page/hiddenpage/hiddenpage.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const appRoutes: Routes = [
  { path: 'singup', component: SingupComponent },
  { path: 'singin', component: SinginComponent },
  { path: 'new-task', component: NewTaskComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'hidden', component: HiddenpageComponent, canActivate: [AuthService] },
  { path: 'upload-images', component: UploadFormComponent, canActivate: [AuthService] }
];

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    SinginComponent,
    HiddenpageComponent,
    UploadFormComponent,
    ImageCropperComponent,
    ProfileComponent,
    NewTaskComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ToastModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    UsersService,
    AuthService,
    UploadImageService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

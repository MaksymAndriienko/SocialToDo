import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, CanActivate} from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ImageCropperComponent} from 'ng2-img-cropper';
import { AuthService } from './service/auth.service';
import { UsersService } from './service/users.service';
import { GoalService } from './service/goal.service';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { UploadImageService } from './service/upload-image.service';
import { ProfileService } from './service/profile.service';
import { EditprofileService } from './service/editprofile.service';
import { AppComponent } from './app.component';
import { SingupComponent } from './components/singup/singup.component';
import { SinginComponent } from './components/singin/singin.component';
import { HiddenpageComponent } from './components/hidden-page/hiddenpage/hiddenpage.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NewsComponent } from './components/news/news.component';
import { CommonModule } from '@angular/common';
import { NgInviewModule } from 'angular-inport';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewsService } from './service/news.service';
import { FollowingService } from './service/following.service';
import { EditGoalComponent } from './components/edit-goal/edit-goal.component';

const appRoutes: Routes = [
  { path: 'edit-goal', component: EditGoalComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'singin', component: SinginComponent },
  { path: 'news', component: NewsComponent },
  { path: 'new-task', component: NewTaskComponent },
  { path: 'new-goal', component: NewTaskComponent },
  { path: 'edit-goal', component: NewTaskComponent },
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
    EditProfileComponent,
    NewsComponent,
    UserListComponent,
    EditGoalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgInviewModule,
    CommonModule,
    ToastModule.forRoot(),
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    GoalService,
    UsersService,
    AuthService,
    UploadImageService,
    FollowingService,
    NewsService,
    EditprofileService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, CanActivate} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { UsersService } from './service/users.service';
import { AppComponent } from './app.component';
import { SingupComponent } from './components/singup/singup.component';
import { SinginComponent } from './components/singin/singin.component';
import { HiddenpageComponent } from './components/hidden-page/hiddenpage/hiddenpage.component';

const appRoutes: Routes = [
  { path: 'singup', component: SingupComponent },
  { path: 'singin', component: SinginComponent },
  { path: 'hidden', component: HiddenpageComponent, canActivate: [AuthService] }
];

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    SinginComponent,
    HiddenpageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    UsersService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

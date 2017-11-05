import { Component } from '@angular/core';
import {UsersService} from './service/users.service';
import { GoalService } from './service/goal.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService, GoalService]
})
export class AppComponent {
  constructor(private userService: UsersService, private GoalService: UsersService, public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  title = 'app';
}

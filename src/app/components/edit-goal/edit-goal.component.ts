import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.css']
})
export class EditGoalComponent implements OnInit {
  progressBool: Boolean;
  proces: String;

  constructor() { }

  ngOnInit() {
  }

  progress(divToShow){
    this.progressBool = divToShow;
    if(divToShow == true){
      this.proces = "Done";
    }
    else{
      this.proces = "In the process";
    }
  }

}

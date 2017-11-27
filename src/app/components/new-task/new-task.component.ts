import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../service/goal.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  progressBool: Boolean;
  title: String;
  describe: String;
  proces: String;
  token: String;

  constructor(private goalService: GoalService,
              private route: ActivatedRoute
            ) { 
              this.route.queryParams.subscribe(params => {
                console.log(params);
            });
            }

  createGoal(event){
    event.preventDefault();
    var task = {
      token: localStorage.getItem('id_token'),
      title: this.title,
      content: this.describe,
      proces: this.proces
    }
    this.goalService.addNewGoal(task);
  }


  ngOnInit() {
    this.proces = "In the process";
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

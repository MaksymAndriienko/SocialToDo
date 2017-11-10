import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../service/goal.service';

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

  constructor(private goalService: GoalService) { }

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

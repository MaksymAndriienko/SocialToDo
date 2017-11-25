import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../service/goal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.css']
})
export class EditGoalComponent implements OnInit {
  progressBool: Boolean;
  proces: String;
  id: Number
  private task: any;

  constructor(private route: ActivatedRoute, private goalService: GoalService) {
    this.route.queryParams.subscribe(params => {
      this.task = JSON.parse(params["task"]);
      });
      if(this.task.proces == 'In the process'){
        this.progressBool = false;
      }
      else{
        this.progressBool = true;
      }
   }

  ngOnInit() {

  }

  createGoal($event){
    event.preventDefault();
    var taskUpdate = {
      _id: this.task._id,
      title: this.task.title,
      content: this.task.content,
      proces: this.task.proces
    }
    this.goalService.updateGoal(taskUpdate);
  }

  progress(divToShow){
    this.progressBool = divToShow;
    if(divToShow == true){
      this.task.proces = "Done";
    }
    else{
      this.task.proces = "In the process";
    }
  }

}

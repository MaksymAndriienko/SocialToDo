import { Component, NgModule, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  progressBool: Boolean

  constructor() { }

  ngOnInit() {
  }

  progress(divToShow){
    this.progressBool = divToShow;

  }

}

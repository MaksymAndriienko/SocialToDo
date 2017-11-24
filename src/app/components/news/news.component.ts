import { Component, OnInit, HostListener } from '@angular/core';
import { NewsService } from '../../service/news.service';
import { GoalService } from '../../service/goal.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  tasks: any = [];

  constructor(private newsService: NewsService, private goalService: GoalService) { }

  @HostListener("window:scroll", [])
  onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          console.log('End');
      }
  }

  addLike(task){
    console.log(task.likes)
    this.goalService.addLike(task._id).subscribe(
      data => {
        if(data.success == true){
          task.isLike = data.taskLike;
        }
      },
      error => console.log(error)
    );

  }

  ngOnInit() {
    var idUser = {
      id: localStorage.getItem('id_token')
    }
    this.newsService.getTasksNews(idUser)
    .map(res => res.json())
    .subscribe(
      data => {
        if(data.success == true){
          this.tasks = data.tasks;
        }
      },
      error => console.log(error)
    );
  }
 

}

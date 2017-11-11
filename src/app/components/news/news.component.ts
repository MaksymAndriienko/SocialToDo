import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  tasks: any = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    var idUser = {
      id: localStorage.getItem('id_token')
    }
    this.newsService.getTasksNews(idUser)
    .map(res => res.json())
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
    console.log('1');
  }
 

}

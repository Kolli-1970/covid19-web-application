import { Component, OnInit } from '@angular/core';
import { Covid19Service} from '../covid19.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { News } from '../news.model';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  user:User;
   data: News[];

  constructor(public covid19: Covid19Service, private http: HttpClient) { }

  ngOnInit(): void {
    this.user= this.covid19.getUser();    
    this.covid19.getNews().subscribe((news:News[])=>{
      this.data = news;
      
    })
  }

}

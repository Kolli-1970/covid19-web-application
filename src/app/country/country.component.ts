import { Component, OnInit } from '@angular/core';
import { Covid19Service} from '../covid19.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { News } from '../news.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService} from '../news.service';
import{Chart} from 'chart.js';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  user:User;
  data: News[];
date: any;
userid: any;
name: any;
public coutnrywise: any;
public sub: any;
public filter: any;
public newfilter:any;
description: string;
public kkk:any;
public activecases: any;
country:string;
 constructor(public covid19: Covid19Service, private http: HttpClient,  private route: ActivatedRoute, private _news: NewsService, private router:Router) { }
 

 ngOnInit(): void {
  this.route.queryParams.subscribe(params => {   
    this.sub =params;   
    
  });
  // console.log(this.sub)
  this._news.dailyForecastCountry(this.sub).subscribe(res=>{
    this.kkk=res;
    var sry=JSON.stringify(res['timeline.cases']);
    // console.log('im in');     
    // console.log(this.kkk.timeline);  
    let alldates=[];
     Object.keys(this.kkk.timeline['cases']).forEach((key) => {
          alldates.push(key);         
       
     });     
         
      
     let cases=[];
     Object.values(this.kkk.timeline['cases']).forEach((value) => {
      cases.push(value);         
       
     });
     let deaths=[];
     Object.values(this.kkk.timeline['deaths']).forEach((value) => {
      deaths.push(value);         
       
     });
     let recovered=[];
     Object.values(this.kkk.timeline['recovered']).forEach((value) => {
      recovered.push(value); 
                });
  // this.chart = new Chart('canvas', {
  //     type:'line',
  //     data:{
  //       labels:alldates            ,
  //       datasets:[
         
  //         {
  //           data:[20, 10],
  //           borderColor:'#ffcc00',
  //           fill:false
  //         },
  //         {
  //           data:[20, 10],
  //           borderColor:'#3cba9f',
  //           fill:false
  //         },
  //         // {
  //         //   data: recovered,
  //         //   borderColor:'#ffcc00',
  //         //   fill:false
  //         // },
  //       ]
  //     }, 
  //     options:{
  //       legend:{
  //         display:false
  //       },
  //       scales:{
  //         xAxes:[{
  //           display:true
  //         }],
  //         yAxes:[{
  //           display:true
  //         }]
  //       }
  //     }
       

  //     })
  // console.log(cases);
  new Chart('CovidBar', {
  type: 'bar',
  data: {
      labels: alldates,
      datasets: [{
          label: 'Daily Cases',
          data: cases,
          backgroundColor:'rgba(54, 162, 235, 1)',                               
         
          borderWidth: 1
      },
      {
        label: 'Daily Deaths',
        data: deaths,
        backgroundColor: 'rgba(255, 206, 86, 1)',                               
       
        borderWidth: 1
    },
    {
      label: 'Daily Recovered',
      data: recovered,
      backgroundColor:'rgba(75, 192, 192, 1)',                               
     
      borderWidth: 1
  },
    ]
      
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});
     
})
this._news.totalSummoryCountry(this.sub).subscribe(res=>{
  this.kkk=res;
  let alldates=[];
   Object.keys(this.kkk.timeline['cases']).forEach((key) => {
        alldates.push(key);         
     
   }); 
        let cases=[];
         Object.values(this.kkk.timeline['cases']).forEach((value) => {
          cases.push(value);         
           
         });
         let deaths=[];
         Object.values(this.kkk.timeline['deaths']).forEach((value) => {
          deaths.push(value);         
           
         });
         let recovered=[];
         Object.values(this.kkk.timeline['recovered']).forEach((value) => {
          recovered.push(value); 
                    });

                    new Chart('CovidChart', {
                      type: 'line',
                      data: {
                          labels: alldates,
                          datasets: [{
                            label: 'Total Cases',
                              data: cases,
                              borderColor: 'black',
                              backgroundColor: 'rgba(255,0,0,0.3)',
                              
                          },
                          {
                            label: 'Total Recovered',
                              data: recovered,
                              backgroundColor: 'rgba(255,0,0,0.3)',
                                                          
                              borderColor: 'black',
                              
                          },
                          {
                            label: 'Total Deaths',
                              data: deaths,
                              backgroundColor: 'rgba(255, 206, 86, 1)',                            
                              borderColor: 'black',
                              
                          },
                         
                       
                        ]
                          
                      },
                      options: {
                          scales: {
                              yAxes: [{
                                  ticks: {
                                      beginAtZero: true
                                  }
                              }]
                          }
                      }
                  }); 
   
  });
 
  
  // console.log(this.sub.country);
   this.http.get('https://api.covid19api.com/summary',{responseType:"json"}).subscribe(
        response => {
            this.coutnrywise = response;         
            var summary=JSON.stringify(response);
            //  console.log(this.coutnrywise.Countries['0'].Country);  
            //  console.log(this.sub.country);    
             let playStore = [];
             for (let item of this.coutnrywise.Countries) {
              if (item.Country==this.sub.country) {
                playStore.push(item);
                  // console.log('Success');
              }
             
          }  
          this.filter=playStore;

          this.activecases=this.filter['0'].TotalConfirmed - this.filter['0'].TotalRecovered-this.filter['0'].TotalDeaths;
          new Chart('CovidPie', {
            type: 'pie',
            data: {
                labels: ['Dead Cases','Recoverd Cases', 'Active Cases'],
                datasets: [{
                   
                    data: [this.filter['0'].TotalDeaths, this.filter['0'].TotalRecovered,this.activecases],
                    backgroundColor: ['rgba(30, 169, 224, 0.8)',
              'rgba(255,165,0,0.9)',
              
              ]
                    
                },
               
             
              ]
                
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }); 
         
       }); 
      //  console.log(this.coutnrywise.Countries); 
     this.user= this.covid19.getUser();    
   this.covid19.getNews().subscribe((news:News[])=>{
     this.data = news;
console.log(this.data )
     let playStore = [];
     for (let item of this.data) {
      if (item.country==this.sub.country) {
        playStore.push(item);
          // console.log('Success');
      }
     
  }  
  this.newfilter=playStore;
    //  console.log(this.data);
   })
  
 }
 onSubmit(){
 
  let news: News={
    date:new Date(this.date),
    description: this.description,
    country: this.sub.country,
    userid: this.user.uid,
    name:this.user.displayName,
    };
    this.covid19.adNews(news);
    this.userid=undefined;
    this.date=undefined;
    this.description=undefined;
    this.country=undefined;
    this.name=undefined;
 }
}

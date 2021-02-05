import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Covid19Service} from '../covid19.service';
import { NewsService} from '../news.service';
import { User } from '../user.model';
import { News } from '../news.model';
import { Router } from '@angular/router';
import{Chart} from 'chart.js';
import { Summary } from '../summary.model';
import { MatSliderModule } from '@angular/material/slider';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {
  chart: any;
  user:User;
  data: any;
  public sum: any;
  public summary: Summary[] =[];
  public activecases: any;
  
  constructor( private _news: NewsService,public covid19: Covid19Service,private http: HttpClient, private router:Router)  { }
 
  
  ngOnInit(): void {
    
//     this._news.getSummary().subscribe((response)=>{
// this.summary=response;
//     });

    // console.log(this.summary);

    this._news.dailyForecast().subscribe(res=>{
        let alldates=[];
         Object.keys(res['cases']).forEach((key) => {
              alldates.push(key);         
           
         });               

         let cases=[];
         Object.values(res['cases']).forEach((value) => {
          cases.push(value);         
           
         });
         let deaths=[];
         Object.values(res['deaths']).forEach((value) => {
          deaths.push(value);         
           
         });
         let recovered=[];
         Object.values(res['recovered']).forEach((value) => {
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

this._news.totalSummory().subscribe(res=>{
  let alldates=[];
   Object.keys(res['cases']).forEach((key) => {
        alldates.push(key);         
     
   }); 
        let cases=[];
         Object.values(res['cases']).forEach((value) => {
          cases.push(value);         
           
         });
         let deaths=[];
         Object.values(res['deaths']).forEach((value) => {
          deaths.push(value);         
           
         });
         let recovered=[];
         Object.values(res['recovered']).forEach((value) => {
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
              

    this.http.get('https://api.covid19api.com/summary',{responseType:"json"}).subscribe(
      response => {
          this.sum = response;  
          this.summary = this.sum.Countries;         
          var summary=JSON.stringify(response);
        // console.log(this.sum.Global.TotalDeaths);
         this.activecases=this.sum.Global.TotalConfirmed-this.sum.Global.TotalRecovered-this.sum.Global.TotalDeaths;
        new Chart('CovidPie', {
          type: 'pie',
          data: {
              labels: ['Dead Cases','Recoverd Cases', 'Active Cases'],
              datasets: [{
                 
                  data: [this.sum.Global.TotalDeaths, this.sum.Global.TotalRecovered,this.activecases],
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
     
     
 
    this.user= this.covid19.getUser();
    this.covid19.getNews().subscribe((news:News[])=>{
      this.data = news;
     //  console.log(this.data);
    })
     
  }
 key='Country';
 reverse: boolean=false;
 sort(key){
   this.key=key;
   this.reverse=!this.reverse;
 }
  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.router.navigate(["country"], { queryParams: { country: value } });
    
  }
}

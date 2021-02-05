import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';
import { News } from './news.model';
import { Summary } from './summary.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Covid19Service {
private user: User;
private news: News;
public summaryobj: any;
Summary: Observable<Summary[]>;


  constructor(private afAuth:AngularFireAuth, private router: Router, private firestore: AngularFirestore, private http: HttpClient) { }
  async signInWithGoogle(){
    const credientials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
this.user={
  uid: credientials.user.uid,
  displayName:credientials.user.displayName,
  email: credientials.user.email,
};

localStorage.setItem("user", JSON.stringify(this.user));
this.updateUserData();
this.router.navigate(["covid19"])
  }
private updateUserData(){
  this.firestore.collection("users").doc(this.user.uid).set({
    uid: this.user.uid,
    displayName:this.user.displayName,
    email: this.user.email,
  },{merge:true});
  }
  getUser(){
    if(this.user==null && this.userSignedIn()){
      this.user=JSON.parse(localStorage.getItem("user"));
    }
    return this.user;
  }
  userSignedIn(): boolean{
    return JSON.parse(localStorage.getItem("user"))!=null;
  }
  signOut(){
    this.afAuth.signOut();
    localStorage.removeItem("user");
    this.user=null;
    this.router.navigate(["signin"]);
  }
  home(){
       this.router.navigate(["covid19"]);
  }
  getNews(){
    return this.firestore.collection("covidnews").valueChanges();
  }

  // updateSummary(){
  //  return  this.http.get('https://api.covid19api.com/world',{responseType:"json"}).subscribe(
  //     response => {
  //         this.summaryobj = response;         
  //         var summary=JSON.stringify(response);
  //         // console.log(summary);
  //         this.firestore.collection("covidsummary").add(summary);
  //    }); 
     
  // }
  getSummary(){    
    return this.firestore.collection("covidsummary").valueChanges();
  }
  adNews(news: News){
    this.firestore.collection("covidnews").add(news);
  }
}



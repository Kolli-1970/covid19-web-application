import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { NewsComponent } from './news/news.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Covid19Component } from './covid19/covid19.component';
import { CountryComponent } from './country/country.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NewsComponent,
    Covid19Component,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // NgxChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    ChartsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

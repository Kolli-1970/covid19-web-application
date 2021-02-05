import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CountryComponent } from './country/country.component';
import { Covid19Component } from './covid19/covid19.component';
import { NewsComponent } from './news/news.component';
import { SecurePagesGuard } from './secure-pages.guard';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path: "signin", component: SigninComponent, canActivate: [SecurePagesGuard]},
  {path: "news", component: NewsComponent, canActivate: [AuthGuard]},
  {path: "country", component: CountryComponent, canActivate: [AuthGuard]},
  {path: "covid19", component: Covid19Component, canActivate: [AuthGuard]},
  {path: "",pathMatch:"full", redirectTo: "signin"},
  {path: "**",redirectTo:"signin"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

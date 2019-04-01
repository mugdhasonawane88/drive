import { NgModule } from '@angular/core';
import { Routes, RouterModule ,ActivatedRoute } from '@angular/router';

import {HomeComponent} from '../app/home/home.component';
import {AboutComponent} from '../app/about/about.component';
import {NavComponent} from '../app/nav/nav.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

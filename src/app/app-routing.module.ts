import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookpageComponent } from './bookpage/bookpage.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MoviesComponent } from './movies/movies.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',component:MoviesComponent},
  {path:'booking/:id',component:BookpageComponent},
  {path:'bookingdone',component:MovieCardComponent},
  {path:'welcome',component:WelcomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

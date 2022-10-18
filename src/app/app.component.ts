import { Component, OnDestroy } from '@angular/core';
import { ApiConsumerService } from './movies/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'BookMyShow';
  spinner:boolean = false;
  sub: any;
  constructor(private service: ApiConsumerService){
    // this.sub = this.service.spinnerSub.subscribe(res=>{
    //   console.log(res)
    //   this.spinner = res;
    // })
  }
  ngOnDestroy(): void {
    this.sub.unSubscribe();
  }
  
}

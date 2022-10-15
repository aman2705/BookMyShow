import { Component, Input, OnInit } from '@angular/core';
import { movies } from '../Utilities/movies';
import { ApiConsumerService } from '../movies/movies.service'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bookpage',
  templateUrl: './bookpage.component.html',
  styleUrls: ['./bookpage.component.css']
})
export class BookpageComponent implements OnInit {

 moviesData: any;
  constructor(private service: ApiConsumerService,private router:Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    let movieID = this.route.snapshot.paramMap.get('id');
    console.log(movieID);
    const passMovieID : string = movieID !== null ? movieID : '';
    this.service.getMovieDetails(parseInt(passMovieID)).subscribe(res => {this.moviesData = res});
  }
  bookticket(movie:movies){
    this.router.navigate(['bookingdone'])
  }

}

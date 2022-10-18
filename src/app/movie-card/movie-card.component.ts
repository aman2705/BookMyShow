import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { MoviesComponent } from '../movies/movies.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { movies } from '../Utilities/movies';
import { Users } from '../Utilities/users';
import { Constant } from '../Utilities/constant';
import { ApiConsumerService } from '../movies/movies.service';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']

})
export class MovieCardComponent implements OnInit {


  public eventBookingForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    numberOfTickets: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });
  public moviesData: any;

  submitted: boolean = false;

  constructor(private httpClient: HttpClient, private service: ApiConsumerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let movieID = this.route.snapshot.paramMap.get('id');
    const passMovieID: string = movieID !== null ? movieID : '';

    // this.service.nextSpinnerState(true);
    this.service.getMovieDetails(parseInt(passMovieID)).subscribe(res => {
      this.moviesData = res;
      // this.service.nextSpinnerState(false);
    }, error => {
      // this.service.nextSpinnerState(false);
    });
  }
  noOfTicketsChanged(ev: any) {
    let tickets = this.moviesData.tickets - ev.target.value;
    if (tickets < 0) {
      alert("Seats not available");
      return;
    }
    this.moviesData.tickets = tickets;
  }
  submit() {

    this.submitted = true;
    let bookingTicket: any = this.eventBookingForm.value;
    bookingTicket['movieID'] = this.moviesData.id;
    bookingTicket['movieName'] = this.moviesData.movie_name;
    if (!this.eventBookingForm.valid) {
      return;
    }
    // this.service.nextSpinnerState(true);
    this.service.saveBooking(this.eventBookingForm.value).subscribe(res => {
      this.service.putMovieDetails(this.moviesData.id, this.moviesData).subscribe(res2 => {
        alert("Booking confirmed");
        // this.service.nextSpinnerState(false);
      }, error => {
        // this.service.nextSpinnerState(false);
      })
    }, error => {
      // this.service.nextSpinnerState(false);
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { MoviesComponent } from '../movies/movies.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { movies } from '../Utilities/movies';
import { Users } from '../Utilities/users';
import { Constant } from '../Utilities/constant';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']

})
export class MovieCardComponent implements OnInit {


  eventBookingForm = new FormGroup({});
  private _route: any;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private dataStream = new BehaviorSubject(movies)
  private userDataStream = new BehaviorSubject(Users)

  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getDataStream() {
    return this.dataStream.asObservable()
  }

  getUserDataStream() {
    return this.userDataStream.asObservable()
  }

  putData(data: any) {
    this.dataStream.next(data)
  }
  private testP = 'https://63464de09eb7f8c0f87851db.mockapi.io/movie_tickets'

  private user = 'https://63464de09eb7f8c0f87851db.mockapi.io/booking'

  getUserData(): Observable<any> {
    return this.httpClient.get(this.user)
  }

  getUserDetail(id: number): Observable<any> {
    return this.httpClient.get(this.user + '/' + id)
  }

  getMovieData(id: number): Observable<any> {
    return this.httpClient.get(this.testP + '/' + id)
  }

  getMovieDetails(): Observable<any> {
    return this.httpClient.get(this.testP)
  }

  updateUserDetails(userD: Users, movie: movies) {
    console.log(this.user + '/' + userD.id)
    this.httpClient.put(this.user + '/' + userD.id, userD).subscribe()
  }

  updateTicketDetails(movie:any, tickets: any) {

    movie.tickets = movie.tickets - tickets
    this.httpClient.put(this.testP + '/' + movie.id, movie).subscribe()
  }

  addNewUser(user: Users) {
    // const user = new userData()
    // user.name = name
    // user.movieName = movie
    this.httpClient.post<any>(this.user, user).subscribe()
  }

  handleError(er: any) {
    return throwError(() => {
      console.log(er)
    })
  }

}

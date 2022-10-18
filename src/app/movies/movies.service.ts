import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../Utilities/constant';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { movies } from '../Utilities/movies';

@Injectable({
  providedIn: 'root'
})
export class ApiConsumerService {
  constructor(private httpClient: HttpClient) { }

  /* Movie APi */
  getAllMovies(): Observable<any> {
    return this.httpClient.get(`${Constant.getEndpoint.toString()}/movie_tickets`);
  }

  getMovieDetails(id: number) {
    return this.httpClient.get(`${Constant.getEndpoint}/movie_tickets/${id}`.toString());
  }

  putMovieDetails(id: number, data: any) {
    return this.httpClient.put(`${Constant.getEndpoint}/movie_tickets/${id}`.toString(), data);
  }
  /* Booking API */
  saveBooking(data: any) {
    return this.httpClient.post(`${Constant.getEndpoint}/booking`.toString(), data);
  }

  getAllBooking() {
    return this.httpClient.get(`${Constant.getEndpoint}/booking`.toString());
  }

  updateBooking(id:number, data: any) {
    return this.httpClient.put(`${Constant.getEndpoint}/booking/${id}`.toString(), data);
  }

  //
  // public spinnerSub = new BehaviorSubject<boolean>(false);

  // public nextSpinnerState(state: boolean){
  //   this.spinnerSub.next(state);
  // }
}

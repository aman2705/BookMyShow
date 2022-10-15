import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../Utilities/constant';
import { catchError, Observable, retry, throwError} from 'rxjs';
import { movies } from '../Utilities/movies';

@Injectable({
  providedIn: 'root'
})
export class ApiConsumerService {
  constructor(private httpClient: HttpClient) { }
  getAllUserDetails(): Observable<any>{
    return this.httpClient.get(Constant.getEndpoint.toString()).pipe(retry(1), catchError(this.handleError));
  }

  getMovieDetails(id : number){
    return this.httpClient.get(`${Constant.getEndpoint}/${id}`.toString()).pipe(retry(1),catchError(this.handleError));
  }

  deleteUser(id: number){
    return this.httpClient.delete(`${Constant.deleteEndpoint}/${id}`).pipe(retry(1),catchError(this.handleError))
  }

  addNewUser(name: String, location:String):Observable<movies>{
    const user = new movies()
    user.Movie_name = name
    // user.location = location
    const header = new HttpHeaders()
    header.set('Content-Type', 'application/json')
    return this.httpClient.post<movies>(Constant.getEndpoint.toString(),user, {headers: header}).pipe(retry(1),catchError(this.handleError))
  }

  handleError(er:any){
    return throwError(()=>{
      console.log(er)
    })
  }
}

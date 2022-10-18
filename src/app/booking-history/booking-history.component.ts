import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiConsumerService } from '../movies/movies.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  public bookings: any = [];
  public cloneBookings: any = [];
  dataSource: any = new MatTableDataSource(this.bookings);
  displayedColumns: string[] = ['index', 'name', 'movieName', 'numberOfTickets', 'phone', 'action'];
  public movies: any;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private service: ApiConsumerService) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.service.getAllBooking().subscribe((res: any) => {
      this.bookings = res.map((i: any, index: number) => ({ ...i, index: (index + 1), isEditable: false }));
      this.cloneBookings = JSON.parse(JSON.stringify(this.bookings));
      this.dataSource = new MatTableDataSource(this.bookings);
      this.dataSource.sort = this.sort;
    })
    this.getAllMovies();
  }
  getAllMovies() {
    // this.service.nextSpinnerState(true);
    this.service.getAllMovies().subscribe((data) => {
      this.movies = data;
      // this.service.nextSpinnerState(false);
    }, error => {
      // this.service.nextSpinnerState(false);
    });
  }

  editMovieTicket(elem: any) {
    elem.isEditable = !elem.isEditable;
  }
  saveMovieTicket(elem: any) {
    elem.isEditable = !elem.isEditable;

    const prevtickets = this.cloneBookings.filter((i:any) => i.id == elem.id)[0].numberOfTickets;
    const movieSeleted = this.movies.filter((i:any) => i.id == elem.movieID)[0];
    let ticketChanged = elem.numberOfTickets - prevtickets;
    if(ticketChanged > 0){
      // buying tickets
      let ticketsAvaiable = movieSeleted.tickets - ticketChanged;
      if(ticketsAvaiable < 0){
        alert("Seats not available");
        return;
      }
      movieSeleted.tickets = ticketsAvaiable;
    }else{
      // canceling tickets
      ticketChanged = ticketChanged * -1;
      movieSeleted.tickets = movieSeleted.tickets + ticketChanged;
    }

    // this.service.nextSpinnerState(true);
    this.service.updateBooking(elem.id, elem).subscribe(res=>{
      this.service.putMovieDetails(movieSeleted.id, movieSeleted).subscribe(res2 =>{
        alert("Booking updated");
        // this.service.nextSpinnerState(false);
        this.getAllMovies();
      }, error => {
        // this.service.nextSpinnerState(false);
      })
    }, error => {
      // this.service.nextSpinnerState(false);
    })



  }
  cancelMovieTicket(elem:any){
    elem.numberOfTickets = this.cloneBookings.filter((i:any) => i.id == elem.id)[0].numberOfTickets;
    elem.isEditable = !elem.isEditable;
  }

}

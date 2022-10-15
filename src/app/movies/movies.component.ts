import { Component, Input, OnInit } from '@angular/core';
import { movies } from '../Utilities/movies';
import { ApiConsumerService } from './movies.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

 users: any
 

//   movies:any=[{
//     movie_name:"Mission: Impossible – Fallout",
//     desc:"Ethan Hunt and his IMF team, along with some familiar allies, race against time after amission gone wrong",
//     guide:"U/A",
//     year:"2018",
//     Genre:"Action/Thriller",
//     time:"2h 27m",
//     image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTDuzrnxIkh11AqI-6PrU9Qrycml22OhFHM9UwGmlkxCsPctLTr",
//     imdb:"https://www.imdb.com/title/tt4912910/",
//     percentage:"97%",
//     background:"rgba(0,0,0,0.1)",
//     tickets:"96"


//   },
//   {
//     movie_name:"3 idiots",
//     desc:"In college, Farhan and Raju form a great bond with Rancho due to his refreshing outlook. Years later, a bet gives them a chance to look for their long-lost friend whose existence seems rather elusive",
//     guide:"U/A",
//     year:"2009",
//     Genre:"Comedy/Romance",
//     time:"2 hr 51 min",
//     image:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJKJ6lGwFMrQR0gDdFAp0KU4kJ5WYhEpB8GcrQtlhrcAQ75QV-",
//     imdb:"https://www.imdb.com/title/tt1187043/",
//     percentage:"100%",
//     tickets:"91"
//   },
//   {
//     movie_name:"Vikram Vedha",
//     desc:"Vikram Vedha is a 2022 Indian Hindi-language neo-noir action thriller film written-directed by Pushkar–Gayathri, based on their 2017 Tamil film of the same name and also inspired by the Indian folktale Baital Pachisi. ",
//     guide:"U/A",
//     year:" 2022",
//     Genre:"Action/Adventure",
//     time:"2 hr 28 min",
//     image:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT-S81gaS-IAz0F-IlS_q0oPaVy_9NMFg4rLFQt_XjsAUWwWzEC",
//     imdb:"https://www.imdb.com/title/tt0499549/",
//     percentage:"90%",
//     tickets:"92"
//   },
//   {
//     movie_name:"Avatar",
//     desc:"Jake, who is paraplegic, replaces his twin on the Na'vi inhabited Pandora for a corporate mission. After the natives accept him as one of their own, he must decide where his loyalties lie.",
//     guide:"U/A",
//     year:"2009",
//     Genre:"Sci-fi/Action",
//     time:"2 hr 41 min",
//     image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQXDaxvXPpbQkUf2ifM7yg6b-AIsZT3o_hMf8nFLcttL-PVAM6r",
//     imdb:"https://www.imdb.com/title/tt13131350/",
//     percentage:"82%",
//     tickets:"92"
//   },
//   {
//     movie_name:"Talvar",
//     desc:"A hardened investigator deals with conflicting perspectives involving a brutal double murder. The case gets complicated when the parents of the murdered girl emerge as the prime suspects.",
//     guide:" U/A",
//     year:"2015",
//     Genre:"Thriller/Drama",
//     time:"2 hr 12 min",
//     image:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ4MbtPQLqnzY1fd1qyhT-4iZ3T1o3_lpvkn4yW5zzsSXOCZoCt",
//     imdb:"https://www.imdb.com/title/tt4934950/",
//     percentage:"81%",
//     tickets:"100"
//   },
//   {
//     movie_name:"Badhaai Do",
//     desc:"Shardul, a gay guy, and Suman, a lesbian woman, enter into holy matrimony to appease their families. However, when Suman's girlfriend moves in with them, their lives become more complex.",
//     guide:"U/A",
//     year:"2022",
//     Genre:"Drama",
//     time:"2 hr 27 min",
//     image:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTRwdILw-UcAN1DHNDZKMmaoiuA7O6LdqzP--Xq1QOiOXeLsiVs",
//     imdb:"https://www.imdb.com/title/tt11934846/",
//     percentage:"93%",
//     tickets:"99"
//   },
//   {
//     movie_name:"Badhaai Do",
//     desc:"In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//     guide:"U/A",
//     year:"2015",
//     Genre:"Action/War",
//     time:"2 hr 38 min",
//     image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTANLW6o_XKmdd3zyIgBRb0OyEeqwB54QWJ7ZgJteucuSIZSEZE",
//     imdb:"https://www.imdb.com/title/tt2631186/",
//     percentage:"90%",
//     tickets:"98"
//   },
//   {
//     movie_name:"M.S. Dhoni: The Untold Story",
//     desc:"M S Dhoni, a boy from Ranchi, aspires to play cricket for India. Though he initially tries to please his father by working for the Indian Railways, he ultimately decides to chase his dreams.",
//     guide:"U",
//     year:"2016",
//     Genre:"Sport/Drama",
//     time:"3h 10 min",
//     image:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSeQTJK-aG3Z5HF_M5giJZ1gyI0QgXy1Y7XM3o4bP0sSL0A8JBK",
//     imdb:"https://www.imdb.com/title/tt4169250/",
//     percentage:"75%",
//     tickets:"97"
//   }

// ]
  constructor(private service :ApiConsumerService,private test:HttpClient,private Router:Router) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser() {
    this.service.getAllUserDetails().subscribe((data)=>{
    this.users=data
    });
  }
  getMovieData(id:number): Observable<any>{
    return this.test.get('https://63464de09eb7f8c0f87851db.mockapi.io/movie_tickets'+'/'+id)
  }
  clicked(movie: any) {
    console.log(movie);
    this.Router.navigate(['booking/'+movie.id]);
  }
  

  
}

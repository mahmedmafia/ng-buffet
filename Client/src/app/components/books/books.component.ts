import { Component, OnInit, OnDestroy } from '@angular/core';
// import { BookstoreService, Book } from 'src/app/services/productstore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    // this.bookSub.unsubscribe();
  }
  // // query;
  // // books: Book[];
  // // bookSub = new Subscription();
  // constructor(private storeServ: BookstoreService, private router: Router, private route: ActivatedRoute) {
  //   this.route.queryParams.subscribe(params => { this.query = params['title'] || ''; });
  // }
  ngOnInit() {
    // this.storeServ.getBooks();
    // this.bookSub = this.storeServ.BooksChanged.subscribe(res => {
    //   this.books = res;
    //   console.log(this.books);
    // });
  }
  // submit(query) {
  //   this.router.navigate(['books'],
  //    { queryParams: { title: query } })
  //    .then(_ => { this.search() });
  // }
  // search() {
  //   // if (!this.query) {
  //   //   return;
  //   // }
  //   this.storeServ.serachBooks(this.query);
  // }
}

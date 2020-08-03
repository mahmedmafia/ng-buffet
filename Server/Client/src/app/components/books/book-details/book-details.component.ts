import { Component, OnInit } from '@angular/core';
// import { ProductstoreService, Book } from 'src/app/services/productstore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id;
  // book: Book;
  modelOpen = false;
  isLogin = false;
  // constructor(private bookStore: ProductstoreService, private route: ActivatedRoute, private router: Router, private authServ: AuthService) {

  //   this.route.params.subscribe(param => { this.id = param['id'] });
  // }

  ngOnInit() {
    // this.bookStore.getBook(this.id).subscribe(res => {
    //   this.book = res;
    //   console.log(this.book);
    // });
    // this.isLogin = this.authServ.isLogin;
  }
  // deleteBook() {
  //   this.bookStore.deleteBook(this.id).subscribe(res => {
  //     console.log(res);
  //     this.router.navigate(['/books']);
  //     this.modelOpen = false;
  //   }, error => { console.log(error); });
  // }

}

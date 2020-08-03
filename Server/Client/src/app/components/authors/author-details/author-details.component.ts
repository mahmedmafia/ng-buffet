import { Component, OnInit } from '@angular/core';
import { ProductstoreService, Author } from 'src/app/services/productstore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
 export class AuthorDetailsComponent implements OnInit {

//   id;
//   author: Author;
//   modelOpen = false;
//   constructor(private bookStore: ProductstoreService, private route: ActivatedRoute, private router: Router) {

//     this.route.params.subscribe(param => { this.id = param['id'] });
//   }

  ngOnInit() {
    // this.bookStore.getAuthor(this.id).subscribe(res => {
    //   this.author = res;
    //   console.log(this.author);
    // });
  }
//   deleteBook() {
//     this.bookStore.deleteBook(this.id).subscribe(res => {
//       console.log(res);
//       this.router.navigate(['/books']);
//       this.modelOpen = false;

//     });
//   }
 }

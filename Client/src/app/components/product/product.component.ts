import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ProductstoreService } from 'src/app/services/productstore.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  query;
  products: Product[];
  bookSub = new Subscription();
  constructor(private storeServ: ProductstoreService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.query = params['name'] || ''; });
  }
  ngOnInit() {
    this.storeServ.getProducts();
    this.bookSub = this.storeServ.ProductsChanged.subscribe(res => {
      this.products = res;
    });
  }
  submit(query) {
    this.router.navigate(['products'],
     { queryParams: { name: query } })
     .then(_ => { this.search() });
  }
  search() {
    // if (!this.query) {
    //   return;
    // }
    this.storeServ.serachProducts(this.query);
  }
  deleteBook(id){
    this.storeServ.deleteProduct(id).subscribe(res=>{console.log('deleted at' + id)});
  }
}

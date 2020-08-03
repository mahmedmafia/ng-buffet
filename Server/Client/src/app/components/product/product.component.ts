import { AuthService, User } from 'src/app/services/auth.service';
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
  productSub = new Subscription();
  isAdmin=false;
  loggedUser:User;
  isLogin=false;
  constructor(private storeServ: ProductstoreService, private router: Router, private route: ActivatedRoute,private authServ:AuthService) {
    this.route.queryParams.subscribe(params => { this.query = params['name'] || ''; });
  }
  ngOnInit() {
    this.storeServ.getProducts();
    this.productSub = this.storeServ.ProductsChanged.subscribe(res => {
      this.products = res;
    });
    this.authServ.userChange.subscribe(user=>{
      if(user!=null){
        this.loggedUser=user;
        this.isAdmin=this.authServ.isAdmin;
      }else{
        this.isAdmin=false;
        this.isLogin=false;
      }
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

}

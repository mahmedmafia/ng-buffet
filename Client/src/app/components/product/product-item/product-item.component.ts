import { CartService, OrderItem } from './../../../services/cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/services/productstore.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product;
  q_number=1;
  orderItem:OrderItem={
    id:null,
    productPrice:null,
    product:null,
    TotalPrice:null,
    orderId:null,
    order:null,
    quantitySold:null,
  };
  constructor( private cart:CartService) { }

  ngOnInit() {
  }

  addToOrder(){
    this.orderItem.product=this.product;
    this.orderItem.quantitySold=this.q_number;
    this.orderItem.TotalPrice=((+this.product.price)*(+this.orderItem.quantitySold));
    this.orderItem.productPrice=(+this.product.price);
    try{

    this.cart.addOrder(this.orderItem);
    this.product.quantity=+this.product.quantity-(+this.q_number);
    }catch(err){
      console.log(err);
    }

  }
  assignNumber(index){
   this.q_number=index;
  }
}

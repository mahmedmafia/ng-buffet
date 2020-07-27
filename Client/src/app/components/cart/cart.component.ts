import { CartService, Order, OrderItem } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  Cart:Order;
  orderItems:OrderItem[];
  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.Cart=this.cartService.cart;
    this.orderItems=this.Cart.orderItems;
    this.cartService.cartsChanged.subscribe(res=>{

      if(res!=null){
      }else{
        this.Cart=res;
        this.orderItems=this.Cart.orderItems;
      }
    });
  }

}

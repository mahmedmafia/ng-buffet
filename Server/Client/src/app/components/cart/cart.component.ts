import { AuthService, User } from 'src/app/services/auth.service';
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
  user:User;
  constructor(private cartService:CartService,private authServ:AuthService) { }

  ngOnInit() {
    this.Cart=this.cartService.cart;
    this.orderItems=this.Cart.orderItems;
    this.user=this.authServ.user;
    this.authServ.userChange.subscribe(res=>{
      if(res!=null){
        this.user=res;
      }
    })
    this.cartService.cartsChanged.subscribe(res=>{
      if(res==null){
        this.Cart=null;
      }else{
        this.Cart=res;
        this.orderItems=this.Cart.orderItems;
      }
    });
  }
  confirmOrder(){
    this.cartService.confirmOrder(this.Cart,this.user);
  }

}

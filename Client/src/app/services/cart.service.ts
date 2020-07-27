import { HttpClient } from '@angular/common/http';
import { User } from './auth.service';
import { Product } from './productstore.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn:  'root'
})
export class CartService {
  BaseUrl = 'http: //127.0.0.1: 3000/';
  OrdersUrl=this.BaseUrl+'Orders';
  cart:Order={
    orderItems:[],
    user:null,
    TotalPrice:0,
  };
  user:User;
  cartsChanged = new Subject<Order>();
  constructor(private http:HttpClient) { }

  addOrder(orderItem:OrderItem){
    this.cart.orderItems.push(orderItem);
    this.cart.TotalPrice=this.cart.TotalPrice+(+orderItem.TotalPrice);
    this.cartsChanged.next(this.cart);
  }
  emptyCart(ordr:Order){
    this.cart.orderItems=[];
    this.cartsChanged.next(this.cart);
  }
  deleteOrderItem(orderItem:OrderItem,index:number){
    this.cart.orderItems.splice(index,1);
    console.log(index);
    this.cart.TotalPrice=this.cart.TotalPrice-(+orderItem.TotalPrice);
    this.cartsChanged.next(this.cart);

  }
}

export interface Order {
  id?: string ;
  orderItems: OrderItem[];
  OrderDate?: Date;
  TotalPrice?: number;
  user: User;
}

export interface OrderItem{

  id: string ;
  product: Product ;
  quantitySold: number;
  productPrice: number;
  TotalPrice: number;
  order: Order;
  orderId: string;
}

export interface Cart{
  id: string;
  user: User;
  orders: Order[];
  TotalPrice: number;

}
import { AuthService } from 'src/app/services/auth.service';
import { Order } from './cart.service';
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
  // BaseUrl = 'http://127.0.0.1:3000/';
  BaseUrl='';
  OrdersUrl=this.BaseUrl+'orders';
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
  emptyCart(){
    this.cart.orderItems=[];
    this.cart.TotalPrice=0;
    this.cartsChanged.next(this.cart);
  }
  deleteOrderItem(orderItem:OrderItem,index:number){
    this.cart.orderItems.splice(index,1);
    this.cart.TotalPrice=this.cart.TotalPrice-(+orderItem.TotalPrice);
    this.cartsChanged.next(this.cart);
  }
  confirmOrder(order:Order,user:User){
    this.user=user;
    this.cart.user=user;
    this.cart=order;
    this.http.post<Order>(this.OrdersUrl,this.cart).subscribe(res=>{
      if(res['Order']){
        this.emptyCart();
        console.log(res);
      }
    });
  }
  getuserOrder(user:User){
    return this.http.get<Order[]>(this.OrdersUrl).pipe(map(docs => docs['docs']),map(docs=>{
      return docs.filter(doc=>{
        return doc.user==user.id;
      });
    }));
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
}

export interface Cart{
  id: string;
  user: User;
  orders: Order[];
  TotalPrice: number;

}
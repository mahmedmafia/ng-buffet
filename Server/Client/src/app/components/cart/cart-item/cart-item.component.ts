import { OrderItem, CartService } from './../../../services/cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item:OrderItem;
  @Input() index:Number;
  constructor(private cartService:CartService) { }

  ngOnInit() {
  }
  deleteItem(index){
    this.cartService.deleteOrderItem(this.item,index);
  }
}

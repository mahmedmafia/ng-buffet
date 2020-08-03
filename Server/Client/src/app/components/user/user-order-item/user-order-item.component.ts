import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-order-item',
  templateUrl: './user-order-item.component.html',
  styleUrls: ['./user-order-item.component.css']
})
export class UserOrderItemComponent implements OnInit {
  showItems:false;
  @Input() cart:Order;
  constructor() { }

  ngOnInit() {
  }

}

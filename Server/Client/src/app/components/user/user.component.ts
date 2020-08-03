import { CartService, Order } from './../../services/cart.service';
import { AuthService, User } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loggedUser:User;
  showButton:true;
  carts:Order[];
  constructor(private authServ:AuthService,private cartServ:CartService) { }

  ngOnInit() {
    this.loggedUser=this.authServ.user;
    this.authServ.userChange.subscribe(res=>{
      if(res!=null){
        this.loggedUser=res;
      }
    });
    this.cartServ.getuserOrder(this.loggedUser).subscribe(Orders=>{
      console.log(Orders);
      this.carts=Orders;
    });
  }

}

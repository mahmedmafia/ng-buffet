import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, User } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUserForm:FormGroup;
  loggedUser:User;
  constructor(private authServ:AuthService) { 
    this.loggedUser=authServ.user;
    this.editUserForm=new FormGroup({
      email:new FormControl(this.loggedUser.email,Validators.required),
      rank:new FormControl(this.loggedUser.rank,Validators.required),
      id:new FormControl(this.loggedUser.id)
    });
  }

  ngOnInit() {
    this.loggedUser=this.authServ.user;
    this.authServ.userChange.subscribe(res=>{
      if(res!=null){
        this.loggedUser=res;
      }
    });
  }
  editUser(){
    console.log(this.editUserForm);
  }

}

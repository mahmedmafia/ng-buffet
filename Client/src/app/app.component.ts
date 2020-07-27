import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authServ:AuthService){}
  ngOnInit(): void {
    this.authServ.autoAuthUser();
  }
  title = 'ng-buffet';
}

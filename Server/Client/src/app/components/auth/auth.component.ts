import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType;
  login = false;
  constructor(private route: ActivatedRoute, private router: Router, private authServ: AuthService) {
    // this.route..subscribe(param => { this.auth = param['id'] });
    this.route.queryParams.subscribe(qparam => {
      this.authType = qparam['auth'];
      console.log(qparam);
      if (this.authType == 'login') {
        this.login = true;
      } else if (this.authType == 'signup') {
        this.login = false;
      } else {
        this.router.navigate(['signup'], { queryParams: { auth: 'signup' } });
      }
    });

  }

  ngOnInit() {
  }
  Submit(f) {
    const { ...authedUser }: User = f.value;
    // console.log(authedUser);
    if (this.login) {
      this.authServ.login(authedUser);

    } else {
      this.authServ.signUp(authedUser);
    }
  }

}

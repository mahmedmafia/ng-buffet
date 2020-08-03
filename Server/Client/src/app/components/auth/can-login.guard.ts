import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class CanLoginGuard implements CanActivate  {

  constructor(private authServ:AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authServ.isLogin){
      return true;
    }else{
    window.alert('you should Login');
    this.router.navigate(['/user'],{queryParams:{auth:'login'}});
     return false;
    }
    
  }

  
}

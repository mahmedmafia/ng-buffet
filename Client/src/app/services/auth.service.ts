import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    BaseUrl = 'http://127.0.0.1:3000/';
    UsersUrl = 'http://127.0.0.1:3000/users'
    private token;
    user: User={
        id:null,
        email:null,
        
    };
    isLogin = false;
    expiresIn = 120000;
    userChange = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) {

    }
    get Token() {
        return this.token;
    }
    login(user) {
        this.http.post<User>(this.UsersUrl + '/login', user).subscribe(res => {
            this.token = res['token'];
            
            this.user = { email: res['user']['email'], id: res['user']['_id'] };
            console.log(this.token);
            // this.user.id = res['user']['_id'];
            this.isLogin = true;
            console.log(this.user);
            console.log(res);
            const expiersInDuration = res['expiresIn'];
            // this.setAuthTimer(expiersInDuration);
            const now = new Date();
            const expirationDate = new Date (now.getTime() + expiersInDuration * 1000)
            this.saveAuthdata(this.token,expirationDate,this.user.id,this.user.email);
            // this.autoLogout();
            this.router.navigate(['products']);
            this.userChange.next({ ...this.user });
        });

    }

    private getAuthData(){
        const email = localStorage.getItem("email")
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const expirationDate = localStorage.getItem("expiration")
        if (!token || !expirationDate){
            return
        }
        return {
            email: email,
            token: token,
            expirationDate: new Date(expirationDate),
            userId:userId,
        }
    }
    saveAuthdata(token,expirationDate,userId,email){

        localStorage.setItem("email", email );
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId",userId);
    }
    private clearAuthData(){
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');

    }
    autoAuthUser(){
        const AuthInformation =  this.getAuthData();
        console.log(AuthInformation);
        if (!AuthInformation){
            return
        }
        const now = new Date();
        const expairesIn = AuthInformation.expirationDate.getTime() - now.getTime();
        this.expiresIn=expairesIn;
        if (expairesIn > 0){
            this.token = AuthInformation.token;
            this.isLogin = true;
            this.user.id=AuthInformation.userId;
            this.userChange.next({...this.user});
        }
       }

    logout() {
        this.token = '';
        this.isLogin = false;
        this.user = null;
        this.clearAuthData();
        this.userChange.next(null);
    }
 
    signUp(user) {
        this.http.post<User>(this.UsersUrl + '/signup', user).subscribe(res => {
            this.login(user);
        });
    }
    autoLogout() {
        setTimeout(() => {
            this.logout();
        }, this.expiresIn);
    }
}
export interface User {
    id: String,
    email: String,
    password?: String
}
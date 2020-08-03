import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // BaseUrl = 'http://127.0.0.1:3000/';
    BaseUrl='';
    UsersUrl = this.BaseUrl+'users'
    private token;
    user: User={
        id:null,
        email:null,
        rank:' ',
        role:' ',
        
    };
    isLogin = false;
    expiresIn = 120000;
    isAdmin=false;
    userChange = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) {

    }
    get Token() {
        return this.token;
    }
    login(user) {
        this.http.post<User>(this.UsersUrl + '/login', user).subscribe(res => {
            this.token = res['token'];
            console.log(res['user']);
            this.user = { email: res['user']['email'], id: res['user']['_id'],rank:res['user']['rank'],role:res['user']['role'] };
            this.isLogin = true;
            if(this.user.role==Role.admin){
                this.isAdmin=true;
            }
            const expiersInDuration = res['expiresIn'];
            // this.setAuthTimer(expiersInDuration);
            const now = new Date();
            const expirationDate = new Date (now.getTime() + expiersInDuration * 1000)
            this.saveAuthdata(this.token,expirationDate,this.user.id,this.user.email,this.user.rank,this.user.role);
            // this.autoLogout();
            this.router.navigate(['products']);
            this.userChange.next({ ...this.user });
        });

    }

    private getAuthData(){
        const email = localStorage.getItem("email")
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const rank=localStorage.getItem('rank');
        const role=localStorage.getItem('role');

        const expirationDate = localStorage.getItem("expiration")
        if (!token || !expirationDate){
            return
        }
        return {
            email: email,
            token: token,
            expirationDate: new Date(expirationDate),
            userId:userId,
            rank:rank,
            role:role
        }
    }
    saveAuthdata(token,expirationDate,userId,email,rank,role){

        localStorage.setItem("email", email );
        localStorage.setItem("rank", rank );
        localStorage.setItem("role", role );


        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId",userId);
    }
    private clearAuthData(){
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
        localStorage.removeItem("rank" );
        localStorage.removeItem("role" );



    }
    autoAuthUser(){
        const AuthInformation =  this.getAuthData();
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
            this.user.email=AuthInformation.email;
            this.user.rank=AuthInformation.rank;
            this.user.role=AuthInformation.role;
            this.userChange.next({...this.user});
        }
       }

    logout() {
        this.token = '';
        this.isLogin = false;
        this.user = null;
        this.isAdmin=false;
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
    password?: String,
    rank:String,
    role:String,
}
enum Role{
    admin='admin',
    normal='normal',
}
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user!: User;

  constructor(private http: HttpClient,
              private router: Router, 
              private ngZone: NgZone) { 

                this.googleInit();
              }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || ""; 
  }

  
  googleInit(){

    return new Promise<void>( resolve => {
      gapi.load('auth2', () =>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '222504843414-306o1l7c040h77ee5guddm2s5gpn55k7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })
    
  }

  logout(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validateToken(): Observable<boolean>{ 

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe( 
      map( (resp:any) => {
        const { name, email, password, google, img, role, uid} = resp.userDB;
        
        this.user = new User(name, email, '', google, img, role, uid);

        this.user.imageUrl;
        localStorage.setItem('token', resp.token );

        return true;
      })
      ,catchError ( error => of( false ) )
    );
  }

  createUser( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/users`, formData)
                    .pipe(
                      tap( (res:any)=> {
                        localStorage.setItem('token', res.token)
                      })
                    )
     
  }

  updateProfile(data: { email: string, name: string, role: any}){

    data = {
      ...data, 
      role: this.user.role
    }

    return this.http.put(`${base_url}/users/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }
  
  login( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('token', resp.token )
                      })
                    )
     
  }

  loginGoogle( token: object ){
    
    return this.http.post(`${base_url}/login/google`, { token })
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('token', resp.token )
                      })
                    )
     
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/users`, formData)
                    .pipe(
                      tap( (res:any)=> {
                        localStorage.setItem('token', res.token)
                      })
                    )
     
  }
  
  login( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('token', resp.token )
                      })
                    )
     
  }
}

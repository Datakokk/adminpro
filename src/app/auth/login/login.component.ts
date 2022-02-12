import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare let gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.formBuilder.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  })

  constructor( private router: Router,
                private formBuilder: FormBuilder,
                private userService: UserService) { }

  ngOnInit(): void {

    this.renderButton(); 
  }

  login(){

    this.userService.login( this.loginForm.value)
      .subscribe({
        next: x => {
            this.loginForm.get('remember')?.value ?
              localStorage.setItem('email', this.loginForm.get('email')?.value):
              localStorage.removeItem('email')
        },
        error: err => { 
              Swal.fire( 'Error', err.error.msg, 'error')
            },
        complete: () => console.log('Observer got a complete notification')
      })
    
    console.log( this.loginForm.value);
    //this.router.navigateByUrl('/');
  }
  
  onSuccess(googleUser: any) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }

  onFailure(error: any) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }
}

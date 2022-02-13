import { Component, NgZone, OnInit } from '@angular/core';
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
  public auth2: any;

  public loginForm = this.formBuilder.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  })

  constructor( private router: Router,
                private formBuilder: FormBuilder,
                private userService: UserService,
                private ngZone: NgZone) { }

  ngOnInit(): void {

    this.renderButton(); 
  }

  login(){

    this.userService.login( this.loginForm.value)
      .subscribe({
        next: x => {
            this.loginForm.get('remember')?.value ?
              localStorage.setItem('email', this.loginForm.get('email')?.value):
              localStorage.removeItem('email');

              //Navigate to dashboard
              this.router.navigateByUrl('/');
        },
        error: err => { 
              Swal.fire( 'Error', err.error.msg, 'error')
            },
        complete: () => console.log('Observer got a complete notification')
      })
  }
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp() {

    await this.userService.googleInit();

    this.auth2 = this.userService.auth2;
    
    this.attachSignin(document.getElementById('my-signin2'));
    
  };

  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          let id_token = googleUser.getAuthResponse().id_token;
          //console.log(id_token);
          this.userService.loginGoogle( id_token ).subscribe({
            next: x => {
              //Navigate to dashboard
              this.ngZone.run( () => {
                this.router.navigateByUrl('/')
              })
            }
          });

        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}

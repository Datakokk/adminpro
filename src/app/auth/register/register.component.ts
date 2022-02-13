import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  constructor( private formBuilder: FormBuilder,
                private userService: UserService,
                private router: Router) { }

  public registerForm = this.formBuilder.group({
    name:['Nando', [ Validators.required, Validators.minLength(2)] ],
    email: ['nando@nando.com', [Validators.required, Validators.email ] ],
    password: ['123456', Validators.required ],
    password2: ['123456', Validators.required ],
    terms: [ false, Validators.required ]
  }, {
      validators: this.samePasswords('password', 'password2') 
  } as AbstractControlOptions)

  createUser (){
    console.log(this.registerForm);
    this.formSubmitted = true;

    if( this.registerForm.invalid) return;

    //make the post
    this.userService.createUser(this.registerForm.value)
        .subscribe({
          next: x => { this.router.navigateByUrl('/')},
          error: err => { Swal.fire('Error', err.error.msg, 'error')},
          complete: () => console.log('Observer got a complete notification')
        })

  }

  invalidField( field: string): boolean{
    if( this.registerForm.get(field)?.invalid && this.formSubmitted ){
      return true;
    }else{
      return false; 
    }
  }
  
  invalidPasswords(){
    
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return pass1!==pass2 && this.formSubmitted ? true : false;

  }

  acceptTerms(){
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  samePasswords(passName1: string, passName2: string){

    return ( formGroup: FormGroup) => {

      const pass1Control = formGroup.get(passName1);
      const pass2Control = formGroup.get(passName2);
      
      if( pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({ notEquals: true })
      }

    }

  }

}


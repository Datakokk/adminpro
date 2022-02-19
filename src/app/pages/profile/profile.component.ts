import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user!: User;
  public imageUpload!: File;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService) {

    this.user = userService.user;       
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [ this.user.name, Validators.required],
      email: [ this.user.email, [Validators.required, Validators.email] ],
    })
  }

  updateProfile(){
    this.userService.updateProfile(this.profileForm.value)
                      .subscribe( 
                        {
                          next: x => {
                            const { name, email } = this.profileForm.value;
                            this.user.name = name;
                            this.user.email = email; 
    
                            Swal.fire('Saved', 'the changes were saved', 'success')
                          },
                          error: err => {
                            Swal.fire('Error', err.error.msg , 'success')
                            
                          }
                        } 
                      )
  }

  changeImage(event:any){

    this.imageUpload = event.target.files[0];

    if( !event.target.files[0])
      return this.imgTemp = null;

    const reader = new FileReader();

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    return true;
  }

  uploadImage(){
    this.fileUploadService.updatePhoto(this.imageUpload, 'users', this.user.uid!)
    .then( img => {
      this.user.img = img;
      Swal.fire('Saved', 'The image was changed', 'success')
    
    })
    .catch( err => {
      console.log(err);
      Swal.fire('Error', 'Cant upload the image' , 'success')
    })
  }

}

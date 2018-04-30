import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators  } from "@angular/forms";

import { AuthService } from "../../services/auth.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit 
{
  public registerForm : FormGroup
  public hasError : boolean = false;

  constructor
  (
    private router : Router,
    private fb : FormBuilder,
    private authService : AuthService
  ) 
  {
    this.registerForm = this.generateForm();
  }


  generateForm() : FormGroup
  {
    var form = this.fb.group
    ({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      userName : ['', Validators.required],
      email : ['', [Validators.required,Validators.email]],
      password : ['', Validators.required]
    });  
    return form;
  }

  registerUser() : void
  {
    this.authService.registerUser(this.registerForm.value).subscribe
    (
      success => 
      {
        swal('Success', 'User registered successfully', 'success');
        this.router.navigate(['/login']);
      },
      error => 
      {
        console.log(error);
        swal('Error','error occurred','error');
      }
    );
  }

  login() : void
  {
    this.router.navigate(['/login']);
  }

  ngOnInit() 
  {
  }

}

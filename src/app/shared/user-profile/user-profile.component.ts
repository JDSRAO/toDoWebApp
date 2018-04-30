import { Component, OnInit } from '@angular/core';
import { Router  } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators  } from "@angular/forms";

import { AuthService } from "../../services/auth.service";
import { UserServiceService } from "../../services/user-service.service";
import { UserViewModel } from '../../models/user-view-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm : FormGroup
  userInfo : UserViewModel;
  constructor
  (
    private authService : AuthService, 
    private fb : FormBuilder, 
    private router : Router, 
    private userService : UserServiceService 
  ) 
  {
    this.profileForm = this.generateForm(new UserViewModel());
  }

  generateForm(data : UserViewModel) : FormGroup
  {
    var form = this.fb.group
    ({
      firstName : [data.firstName, Validators.required],
      lastName : [data.lastName, Validators.required],
      userName : [data.userName, Validators.required],
      email : [data.email, [Validators.required,Validators.email]],
      password : [data.password, Validators.required]
    });

    return form;
  }

  updateProfile() : void
  {
    this.userService.updateUserProfile('').subscribe
    (
      success => 
      {

      },
      error => 
      {

      }
    );
  }

  getUserInfo() : void
  {
    this.userInfo = JSON.parse(localStorage.getItem(this.authService.userInfoStorageKey)) as UserViewModel;
    this.profileForm = this.generateForm(this.userInfo);
  }

  ngOnInit() 
  {
    this.getUserInfo();
  }

}

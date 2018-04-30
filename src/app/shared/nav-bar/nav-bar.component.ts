import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userInfo : any;
  constructor(private authSerivce : AuthService, private router : Router)
  {
    this.userInfo = this.authSerivce.getUserInfo();
  }

  logout():void
  {
    this.authSerivce.doLogout();
  }

  ngOnInit() {  }

}

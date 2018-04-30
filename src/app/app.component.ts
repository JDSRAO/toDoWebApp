import { Component } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { AuthService } from "../app/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  
  constructor(private authService : AuthService, private router : Router)
  {
    let isAuthenticated = this.authService.isAuthenticated
    this.router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe((event:NavigationStart) => 
    {
      // You only receive NavigationStart events
      // if(!this.authService.getToken() && event.url.includes('login'))
      // {
      //   this.router.navigate(['/login']);
      // }
      if (event.url.includes('login') && this.authService.isAuthenticated) 
      {
        this.router.navigate(['/home']);
      }
    });
  } 
}

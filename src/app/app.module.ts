import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';



import { AppComponent } from './app.component';
import { ToDolistComponent } from './pages/to-dolist/to-dolist.component';
import { HttpLogInterceptor } from "../app/auth/http-log-interceptor";
import { AuthGuard } from "./auth/auth-guard";
import { ToDoServiceService } from './services/to-do-service.service';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { UserServiceService } from "../app/services/user-service.service";


const appRoutes: Routes = 
[ 
  { path: '', component: ToDolistComponent, canActivate: [AuthGuard] }
  ,{ path: 'login', component: LoginComponent }
  ,{ path: 'home', component: ToDolistComponent , canActivate: [AuthGuard] }
  ,{ path: 'add', component: AddItemComponent , canActivate: [AuthGuard] }
  ,{ path: 'edit/:id', component: AddItemComponent , canActivate: [AuthGuard] }
  ,{ path: 'register', component: RegisterUserComponent }
  ,{ path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
]; 


// const appRoutes: Routes = 
// [ 
//   { path: '', component: ToDolistComponent }
//   ,{ path: 'login', component: LoginComponent }
//   ,{ path: 'home', component: ToDolistComponent  }
//   ,{ path: 'add', component: AddItemComponent  }
//   ,{ path: 'edit/:id', component: AddItemComponent  }
//   ,{ path: 'register', component: RegisterUserComponent }
//   ,{ path: 'profile', component: UserProfileComponent }
// ]; 

@NgModule({
  declarations: [
    AppComponent,
    ToDolistComponent,
    AddItemComponent,
    LoginComponent,
    NavBarComponent,
    RegisterUserComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [AuthService,
    AuthGuard,
    UserServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpLogInterceptor, multi: true }
  , ToDoServiceService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

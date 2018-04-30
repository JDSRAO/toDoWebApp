import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import {  Router  } from "@angular/router";

import  { AuthService } from '../services/auth.service';
import { every, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class HttpLogInterceptor implements HttpInterceptor 
{
    constructor(private authService : AuthService, private router : Router   )
    {

    }

    intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // request = request.clone();
        // request.headers.set('Content-Type', 'application/json');
        // request.headers.set('Accept', 'application/json');
        // request.headers.set('Access-Control-Allow-Origin', '*');
        // request.headers.set('Access-Control-Allow-Credentials', 'true');
        //request.headers.append('withCredentials', 'true');
        //request.headers.append('Accept-Language', 'en-Us');  
        let token : string = this.authService.getToken();
        request = request.clone({setHeaders : 
            {
                'Content-Type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:4200',
                'Authorization' : `${this.authService.getToken()}`,
                'Access-Control-Allow-Credentials':'true'
            }});

        return next.handle(request).pipe(catchError(this.handleError));
    }

    private handleError(err : HttpErrorResponse) 
    {
        if (err instanceof HttpErrorResponse) 
        {
            if (err.status === 401 || err.status === 419) 
            {
                //this.authService.doLogout();
                swal('Error',err.statusText,'error');
            }
            else if(err.status === 500)
            {
                swal('Error',err.error.message,'error');
            }
        }

        return new ErrorObservable(
          'Something bad happened; please try again later.');
    };

    
}

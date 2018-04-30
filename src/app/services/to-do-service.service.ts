import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { ToDoItemModel } from '../models/add-item-model';
import { Settings } from "../shared/settings";


@Injectable()
export class ToDoServiceService {

  constructor(private http : HttpClient) { }

  addNewToDo(todoitem : ToDoItemModel) : Observable<any>
  {
    var url = Settings.ApiBaseUrl + 'todo/add';
    return this.http.post(url, todoitem);
  }

  getToDoItems() : Observable<any>
   {
    var url = Settings.ApiBaseUrl + 'todo/items';
     return this.http.get<any>(url);
   }

   getToDoItem(id) : Observable<any>
   {
    var url = Settings.ApiBaseUrl + 'todo/item/'+id;
     return this.http.put<any>(url,{'id' : id});
   }

   deleteToDoItem(id) : Observable<any>
   {
     var url = Settings.ApiBaseUrl + 'todo/delete/' + id;
     return this.http.delete<any>(url);
   }

   updateToDoItem(todoitem : any) : Observable<any>
   {
    var url = Settings.ApiBaseUrl + 'todo/update/';
    return this.http.post<any>(url, todoitem);
   }

}

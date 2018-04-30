import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router }  from '@angular/router';
import { ToDoServiceService } from  '../../services/to-do-service.service';

@Component({
  selector: 'app-to-dolist',
  templateUrl: './to-dolist.component.html',
  styleUrls: ['./to-dolist.component.css']
})
export class ToDolistComponent implements OnInit {

  constructor(private router : Router    
  , private todoService : ToDoServiceService) {}

  toDoItems : any = [];
  

  editItem = function(id) : void
  {
    const url = '/edit/' + id;
    this.router.navigate([url]); 
  };

  addNewItem = function ($event) : void
  {
    this.router.navigate(['/add']); 
  };

  deleteItem = function(id) : void
  { 
    swal
      ({
        title: 'Delete',
        text: 'Are you sure you want to delete?',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F44336",
        confirmButtonText: "Yes"
      }).then
      (
        success =>
        {
          if (success.value) 
          {
            this.todoService.deleteToDoItem(id)
            .subscribe
            (
              success => 
              {
                swal('Success','Deleted successfully', 'success');
              },
               err => 
              {
                console.log(err);
                swal('Error','Error occurred while deleting', 'error');
              },
              fnally => 
              {
                this.ngOnInit();
              }
            );
            
          }
        },
        error => 
        {
          swal('Error',error, 'success');
        }
      );

  };

  getToDoITems = function () 
  {
    this.todoService.getToDoItems()
    .subscribe
    (
      result => 
      {
        this.toDoItems = result.obj;
      },
      err => console.log(err)
    );
    
  }

  ngOnInit() 
  {
    this.getToDoITems();
  }

}

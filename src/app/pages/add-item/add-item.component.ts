import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgForm , FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute }  from '@angular/router';

import { ToDoItemModel } from '../../models/add-item-model';
import { ToDoServiceService } from  '../../services/to-do-service.service';
import { Common } from "../../shared/common";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor
  (
    private toDoService : ToDoServiceService
    , private router : Router
    , private currentUrl : ActivatedRoute 
    , private fb : FormBuilder
  ) 
  {
    var emptyData : ToDoItemModel;
    if (this.isEditMode()) 
    {
      this.getTodoDetails(this.toDoid);
    }
    emptyData = this.generateResetFormData();  
    this.todoForm = this.generateForm(emptyData);   
  }

  private toDoid : string = '';
  public todoForm : FormGroup;

  addTodoT = function (myForm : NgForm)
  {
    if (myForm.form.value.done == '') 
    {
      myForm.form.value.done = false;
    }
    var formData = myForm.form.value as ToDoItemModel;
    formData.status = 'Active';
    this.toDoService.addNewToDo(formData).subscribe
    (
      data => 
      {
        this.router.navigate(['/home']); 
        myForm.resetForm();
      }
      , err =>
      { 
        swal('Error', err, 'error');
      }
    );
    
  }

  addToDoItem()
  {
    if (!(this.todoForm.status == 'INVALID')) 
    {
      var formData = this.todoForm.value as ToDoItemModel;
      if (this.isEditMode()) 
      {
        var updateModel : any = formData;
        updateModel.todoId = this.toDoid;
        this.toDoService.updateToDoItem(formData)
        .subscribe
        (
          success =>
          {
            swal('Success','Update successfull','success');
            this.router.navigate(['/home']);     
            this.todoForm = this.generateForm(this.generateResetFormData());
          },
          err =>
          {
            console.log(err);
            swal('Error', err, 'error');
          }
        )
      
      }
      else
      {
        this.toDoService.addNewToDo(formData)
        .subscribe(
          data => 
          {
            swal('Success','Added successfull','success');
            this.router.navigate(['/home']); 
            this.todoForm = this.generateForm(this.generateResetFormData());
          }
          , err =>
          { 
            console.log(err);
            swal('Error', err, 'error');
          }
        );
      }
    }
    
  }


  getTodoDetails(id : string)
  {
    
    this.toDoService.getToDoItem(id).subscribe
      (
        success =>
        {
          var emptyData : ToDoItemModel = success.obj;
          console.log(emptyData);
          this.todoForm = this.generateForm(emptyData);
        },
        err =>
        {
          swal('Error',err,'error');
        }
      );
  }

  isEditMode() : boolean
  {
    this.toDoid = this.currentUrl.snapshot.paramMap.get('id');    
    if (this.toDoid != null) 
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  generateForm(defaultData : ToDoItemModel) : FormGroup
  {
    var form = this.fb.group
    ({
      title : [defaultData.title, Validators.required],
      description : defaultData.description,
      status : defaultData.status,
      done : defaultData.done,
      dueDate : [ new Date(defaultData.dueDate), Validators.required]
    });

      return form;
  }

  generateResetFormData() : ToDoItemModel
  {
    return new ToDoItemModel('','','Active',false,new Date());
  }

  ngOnInit() 
  {
    
  }

}

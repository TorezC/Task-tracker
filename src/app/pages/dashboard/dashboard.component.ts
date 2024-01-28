import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/types/tasks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showForm = false;
  tasksArray: Tasks[] = []
  currentItem: any
  
  constructor(private taskService: TaskService, private fb: FormBuilder){
   
  }

  toggleForm(){
    this.showForm = !this.showForm;
  }

  ngOnInit(){
   this.getAllTasks()
  }

  // get all tasks
  getAllTasks(){
    this.taskService.getTasks().subscribe(res => {
      this.tasksArray = res;
    })
    
  }

  // filter tasks by status
  filterTasksByStatus(status: string){
    console.log(this.tasksArray)
    return this.tasksArray.filter(task => task.status == status)
  }

  onDragStart(item: any){
    this.currentItem = item
    console.log(this.currentItem)
  }

  onDrop(event: any, status: string){
    event.preventDefault()
    const record = this.tasksArray.find(m=> m.id == this.currentItem.id)
    if(record != undefined ){
      console.log(record)
      console.log(status)
      record.status = status
      this.update(record.status)
    }
    this.currentItem = null
  }

  update(status: any){
    this.taskService.editTaskByStatus(this.currentItem.id, { status: status}).subscribe(() => console.log('status updated'))
  }

  onDragOver(event: any){
    event.preventDefault()
  }
  
  taskForm = this.fb.group({
    title : new FormControl ('', Validators.required),
    description : new FormControl ('', [Validators.required]),
    dueDate : new FormControl ('', Validators.required),
    status : new FormControl ('open'),
  });

  addTask(data: any){
    this.taskService.addTask(data).subscribe(res => {
      console.log(res)
      this.getAllTasks()
      this.taskForm.reset();
    })
  }

  editItem(item: any) {
    this.taskForm.setValue({
      title: item.title,
      description: item.description,
      dueDate: item.dueDate,
      status: item.status
    });
  }

  editTask(id: number, data: Tasks){
    this.taskService.editTask(id, data).subscribe()
  }

}

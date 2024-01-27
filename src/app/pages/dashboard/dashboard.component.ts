import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showForm = false;
  tasksArray: any[] = []
  currentItem: any
  
  constructor(private taskService: TaskService){
   
  }

  toggleForm(){
    this.showForm = !this.showForm;
  }

  ngOnInit(){
   this.getAllTasks()
  }

  getAllTasks(){
    this.taskService.getTasks().subscribe(res => {
      this.tasksArray = res;
    })
    
  }

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
  
}

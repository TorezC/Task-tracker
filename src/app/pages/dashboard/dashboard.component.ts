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
  showEditForm = false;
  tasksArray: Tasks[] = [];
  currentItem: any;
  task: any;

  constructor(private taskService: TaskService, private fb: FormBuilder){
    
  }
  
  
  
  toggleForm(){
    this.showForm = !this.showForm;
  }
  openModal(item: Tasks): void {
    this.showEditForm = true;
    this.getTaskById(item.id)
    
  }

  closeModal(): void {
    this.showEditForm = false;
    this.taskForm.reset()
   this.getAllTasks()
  }
  ngOnInit(){
    console.log(this.showEditForm)
   this.getAllTasks()
  }

  // get all tasks
  getAllTasks(){
    this.taskService.getTasks().subscribe(res => {
      this.tasksArray = res;
    })
    
  }

  // filter tasks by status and sorting alphabetically
  filterTasksByStatus(status: string){
    console.log(this.tasksArray)
    const filtered = this.tasksArray.filter(task => task.status == status)
    return filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
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
    status : new FormControl ('open', Validators.required),
  });

// Adding of tasks
  addTask(data: any){
    this.taskService.addTask(data).subscribe(res => {
      console.log(res)
      this.getAllTasks()
      this.taskForm.reset();
    })
  }

  // getting task by id
  getTaskById(id: number){
    this.taskService.getTasksById(id).subscribe((res) => {
      this.task = res;

      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        dueDate: this.task.dueDate,
      status: this.task.status
      });
    })
    
  }

  // editing existing tasks
  editTask(){
    const updateData = {...this.task, ...this.taskForm.value}
    this.taskService.editTask(this.task.id, updateData).subscribe(() => {
      alert('Updated')
      this.closeModal()
      console.log('updated')
    })
    
  }

  // delete of task
  deleteTask(id: number){
    this.taskService.deleteTask(id).subscribe(()=> {
      console.log('deleted')
      this.getAllTasks()
    })
  }

}

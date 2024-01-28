import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tasks } from '../types/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = environment.BASE_URL;

  public header() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<any>{
   return this.httpClient.get(this.baseUrl, {headers: this.header()})
  }

  addTask(data: Tasks): Observable<any>{
    return this.httpClient.post(this.baseUrl, data || {}, {headers: this.header()})
  }

  editTaskByStatus(id: number, data: any){
    return this.httpClient.put(`${this.baseUrl}/${id}`, data)
  }

  editTask(id: number, data: Tasks){
    return this.httpClient.put(`${this.baseUrl}/${id}`, data || {}, {headers: this.header()})
  }

  getTasksById(id: number){
    return this.httpClient.get(`${this.baseUrl}/${id}`, {headers: this.header()})
  }

  deleteTask(id: number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`, {headers: this.header()})
  }
}

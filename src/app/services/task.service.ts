import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  addTask(data: any): Observable<any>{
    return this.httpClient.post(this.baseUrl, data || {}, {headers: this.header()})
  }

  editTaskByStatus(id: number, data: any){
    return this.httpClient.put(`${this.baseUrl}/${id}`, data)
  }

  editTask(data: any){
    return this.httpClient.put(this.baseUrl, data || {}, {headers: this.header()})
  }

  deleteTask(id: number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`, {headers: this.header()})

  }

}

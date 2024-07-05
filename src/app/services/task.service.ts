import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, Status } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskUrl = "https://letsdo-backend.onrender.com/api/v1/task";

  constructor(private http: HttpClient) { }

  getTask (userID: number): Observable<Task> {
    return this.http.get(`${this.taskUrl}?userID=${userID}`);
  }

  getTaskByStatus(userID: number, status: Status): Observable<any> {
    return this.http.get(`${this.taskUrl}?userID=${userID}&stats=${status}`);
  }

  createTask(data: Task): Observable<Task> {
    return this.http.post(`${this.taskUrl}/create`, data);
  }

  updateTask(data: Task): Observable<Task> {
    return this.http.put(`${this.taskUrl}/update`, data);
  }

  deleteTask(taskID: number): Observable<void> {
    return this.http.delete<void>(`${this.taskUrl}/delete?taskID=${taskID}`);
  }
}

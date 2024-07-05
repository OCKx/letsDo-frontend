import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubTask } from '../interface/sub-task.interface';

@Injectable({
  providedIn: 'root'
})
export class SubsubTaskService {

  subTaskUrl = "https://letsdo-backend.onrender.com/api/v1/sub-task";

  constructor(private http: HttpClient) { }

  getSubTask (taskID: number): Observable<SubTask> {
    return this.http.get(`${this.subTaskUrl}?taskID=${taskID}`);
  }

  createSubTask(data: SubTask): Observable<SubTask> {
    return this.http.post(`${this.subTaskUrl}/create`, data);
  }

  updateSubTask(data: SubTask): Observable<SubTask> {
    return this.http.put(`${this.subTaskUrl}/update`, data);
  }

  deleteSubTask(subTaskID: number): Observable<void> {
    return this.http.delete<void>(`${this.subTaskUrl}/delete?subTaskID=${subTaskID}`);
  }

  deleteAllSubTask(taskID: number): Observable<void> {
    return this.http.delete<void>(`${this.subTaskUrl}/delete?taskID=${taskID}`);
  }
}

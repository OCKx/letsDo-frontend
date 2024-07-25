import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  constructor (public taskService: TaskService) { }

  tasks: Task[] = [];
  userID: number = 2;
  taskID: number = 1;

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTask(this.userID)
    .subscribe((data: any) => {
      this.tasks = data
    },
    (error: any) => {
      console.error('Failed to fetch tasks', error);
    })
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.taskID)
    .subscribe((error: any) => {
      console.error('Failed to delete task');
    })
  }
}

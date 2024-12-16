import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonRoute } from '@app/models/common-route';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  public taskListAsync(userId: string) {
    return this.http.get(CommonRoute.taskList,{
      params: {
        userId: userId
      }
    });
  }

  public addTaskAsync(task: any) {
    return this.http.post(CommonRoute.addTask, task);
  }

  public updateTaskAsync(task: any) {
    return this.http.put(CommonRoute.updateTask, task);
  }

  public deleteTaskAsync(id: string) {
    return this.http.delete(`${CommonRoute.deleteTask}`, {
      params: {
        id: id
      }
    });
  }

  public getTaskByIdAsync(id: string) {
    return this.http.get(`${CommonRoute.getTaskById}`, {
      params: {
        id: id
      }
    });
  }
}

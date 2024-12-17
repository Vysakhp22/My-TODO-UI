import { Component, effect, input, output } from '@angular/core';
import { EPriorityValue, ETaskState } from '@app/models/common';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { TaskService } from '@services/task.service';
import { ConfigData } from '@services/configdata.service';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-task-list-view',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule],
  templateUrl: './task-list-view.component.html',
  styleUrl: './task-list-view.component.scss'
})
export class TaskListViewComponent {
  reload = input<boolean>();
  onEditId = output<string>();
  tasks: {
    code: string;
    task: string;
    priority: string;
    status: string;
  }[] = [];

  public severityStyles = {
    'width': '50%',
  };

  constructor(
    private taskService: TaskService,
    private configData: ConfigData,
    private toast: ToastService
  ) {
    effect(() => {
      if (this.reload()) {
        this.getAllTasks();
      }
    })
  }

  ngOnInit() {
    this.getAllTasks();
  }

  private getAllTasks() {
    this.taskService.taskListAsync(this.configData.userDetail.userId).subscribe({
      next: (response: any) => {
        this.tasks = response.map((task: any) => ({
          code: task.id,
          task: task.title,
          priority: task.priority,
          status: task.status
        }));
      }
    });
  }

  public getStatusSeverity(status: ETaskState): Tag['severity'] {
    switch (status) {
      case ETaskState.Pending:
        return 'warning';
      case ETaskState.InProgress:
        return 'info';
      case ETaskState.Completed:
        return 'success';
    }
  }

  public getPrioritySeverity(priority: EPriorityValue): Tag['severity'] {
    switch (priority) {
      case EPriorityValue.Low:
        return 'info';
      case EPriorityValue.Medium:
        return 'warning';
      case EPriorityValue.High:
        return 'danger';
    }
  }

  public onDeleteTask(taskId: string) {
    const toastService = this.toast.showToast();
    this.taskService.deleteTaskAsync(taskId).subscribe({
      next: () => {
        toastService.success('Task deleted successfully');
        this.getAllTasks();
      },
      error: (err: Error) => {
        toastService.error(err);
      }
    });
  }

}
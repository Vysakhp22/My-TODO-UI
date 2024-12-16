import { Component, effect, input, output } from '@angular/core';
import { EPriorityValue, ETaskState } from '@app/models/common';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
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
  products = [];
  tasks = [
    { code: 'A1', task: 'Task 1', priority: 'High', status: 'Completed' },
    { code: 'A2', task: 'Task 2', priority: 'Medium', status: 'InProgress' },
    { code: 'A3', task: 'Task 3', priority: 'Low', status: 'Pending' },
    { code: 'A4', task: 'Task 4', priority: 'High', status: 'Completed' },
    { code: 'A5', task: 'Task 5', priority: 'Medium', status: 'InProgress' },
    { code: 'A6', task: 'Task 6', priority: 'Low', status: 'Pending' },
    { code: 'A7', task: 'Task 7', priority: 'High', status: 'Completed' },
    { code: 'A8', task: 'Task 8', priority: 'Medium', status: 'InProgress' },
    { code: 'A9', task: 'Task 9', priority: 'Low', status: 'Pending' },
    // { code: 'A10', task: 'Task 10', priority: 'High', status: 'Completed' }
  ];

  public severityStyles = {
    'width': '50%',
  }

  constructor() {
    effect(() => {
      if (this.reload()) {
        // #TODO: Implement the logic to reload the data
      }
    })
  }

  ngOnInit() {
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

}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EPriorityValue, ETaskState } from '@app/models/common';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-task-list-view',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, CommonModule],
  templateUrl: './task-list-view.component.html',
  styleUrl: './task-list-view.component.scss'
})
export class TaskListViewComponent {
  products = [];
  tasks = [
    { code: 'A1', task: 'Task 1', priority: 'High', status: 'Completed' },
  ]

  cols!: Column[];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'task', header: 'Task' },
      { field: 'priority', header: 'Priority' },
      { field: 'status', header: 'Status' }
    ];
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
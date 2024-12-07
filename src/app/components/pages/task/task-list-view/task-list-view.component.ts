import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
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

  public getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined
    }
  }
}
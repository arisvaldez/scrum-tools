import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskModel } from 'src/app/core';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task!: TaskModel;
  @Output() editTask: EventEmitter<TaskModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleEditTask(task: TaskModel) {
    this.editTask.emit(task);
  }

}

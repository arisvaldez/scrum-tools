import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { TaskModel } from 'src/app/core';

type DropdownObject = {
  value: string;
  viewValue: string;
};



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  @Input() connectedOverlay!: CdkConnectedOverlay;
  @Input() task?: TaskModel;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  headerText: string = '';
  createTask!: FormGroup;
  selectedPriority!: string;

  priorities: DropdownObject[] = [
    { value: 'urgent', viewValue: 'Urgent' },
    { value: 'moderate', viewValue: 'Moderate' },
    { value: 'low', viewValue: 'Low' }
  ]

  constructor(private fb: FormBuilder, private _ngZone: NgZone) {
    this.setForm();
  }

  ngOnInit(): void {
    this.setForm();
    this.selectedPriority = '';

    if (this.task && this.task.id.length > 0) {
      this.setValuesOnForm(this.task);
      this.headerText = 'Edit';
      this.selectedPriority = this.task.priority;
    } else {
      this.headerText = 'Crear';
    }
  }


  setForm(): void {
    this.createTask = this.fb.group({
      date: [new Date(), Validators.required],
      priority: ['urgent', Validators.required],
      description: ['', Validators.required]
    });
  }

  triggerResize(): void {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  close(): void {
    this.connectedOverlay.overlayRef.detach();
  }


  onFormAdd(form: TaskModel): void {
    if (this.createTask.valid) {
      console.log('valid');
      this.close();
    } else {
      console.log('editada');
      this.close();
    }
  }

  setValuesOnForm(form: TaskModel): void {
    this.createTask.setValue({
      date: new Date(form.date),
      priority: form.priority,
      description: form.description
    });
  }
}

import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ApiService, ListModel, TaskModel } from './../../core';

const initialValue = {
  id: '',
  description: '',
  date: '',
  priority: '',
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  lists!: ListModel[];
  task!: TaskModel;

  constructor(private apiService: ApiService) {
    this.lists = [];
    this.task = initialValue;
  }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(): void {
    this.apiService.getApi().subscribe(
      (response: any) => this.lists = response['list'],
      error => console.log('Sorry, we have an error', error)
    );
  }

  isOverlayDisplayed: boolean = false;

  readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions!: [
      {
        originX: 'start',
        originY: 'top',
        overlayX: "start",
        overlayY: 'top'
      }
    ]
  }

  displayOverlay(event?: any): void {
    this.isOverlayDisplayed = true;

    if (!!event) {
      this.task = {
        date: event.date,
        id: event.id,
        description: event.description,
        priority: event.priority
      };
    } else {
      this.task = initialValue;
    }
  }

  hideOverlay(): void {
    this.isOverlayDisplayed = false;
  }
}

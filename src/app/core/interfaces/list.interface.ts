import { TaskModel } from './task.interface';

export interface ListModel {
    id: string;
    name: string;
    tasks: TaskModel[];
}
export interface Task {
    taskID?: number;
    userID?: number;
    taskName?: string;
    description?: string;
    status?: Status;
    date_created?: Date;
    due_date?: Date;
    reminderDate?: Date;
  }

export enum Status {
    "pending",
    "started",
    "done",
    "uncompleted"
  }
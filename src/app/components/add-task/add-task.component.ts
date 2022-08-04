import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';

import { UiService } from 'src/app/service/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  error: boolean = false;
  day: string = '';
  reminder: boolean = false;
  text: string = '';
  showAddTask: boolean = false;
  subscription?: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.error = false;
      return (this.showAddTask = value);
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let notComplete = this.text === '' || this.day === '';

    if (notComplete) {
      this.error = !this.error;
      return;
    }

    const { text, day, reminder } = this;
    let newTask = { text, day, reminder };

    this.error = false;

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}

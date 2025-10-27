import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      (onButtonClick)="addItem()"
      (onItemButtonClick)="deleteItem($event)"
      customClass="bg-light-red">
      <img priority ngSrc="assets/img/teacher.png" width="200" height="200" />
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}

import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CardComponent } from '../../core/components/card.component';

@Component({
  selector: 'app-todo',
  imports: [CardComponent, MatButton],
  template: `
    <app-card
      [customStyle]="completed() ? '' : selectedStyle"
      [title]="title()">
      <button mat-button (click)="update.emit()" [disabled]="disabled()">
        Complete
      </button>
      <button mat-button (click)="delete.emit()" [disabled]="disabled()">
        Delete
      </button>
    </app-card>
  `,
})
export class TodoComponent {
  title = input.required<string>();
  disabled = input<boolean>(false);
  completed = input(false);
  update = output<void>();
  delete = output<void>();

  selectedStyle = `
    background: green;
    color: white;
  `;
}

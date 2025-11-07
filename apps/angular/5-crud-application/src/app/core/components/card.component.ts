import { Component, input } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [MatCard, MatCardTitle, MatCardHeader, MatCardActions],
  template: `
    <mat-card [style]="customStyle()" appearance="outlined">
      <mat-card-header>
        <mat-card-title>
          {{ title() }}
        </mat-card-title>
      </mat-card-header>
      <mat-card-actions>
        <ng-content select="button"></ng-content>
      </mat-card-actions>
    </mat-card>
  `,
})
export class CardComponent {
  title = input('');
  customStyle = input('');
}

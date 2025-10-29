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
    <mat-card class="app-card" appearance="outlined">
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
  styles: ['.app-card { display: block}'],
})
export class CardComponent {
  title = input('');
}

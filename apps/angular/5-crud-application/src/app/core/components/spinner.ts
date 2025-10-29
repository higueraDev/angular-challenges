import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinner],
  template: `
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
  `,
})
export class SpinnerComponent {}

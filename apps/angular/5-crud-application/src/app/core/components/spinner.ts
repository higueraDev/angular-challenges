import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinner],
  template: `
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
  `,
  host: {
    style: `
        position: fixed;
        height: 100dvh;
        width: 100dvw;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 1000;
    `,
  },
})
export class SpinnerComponent {}

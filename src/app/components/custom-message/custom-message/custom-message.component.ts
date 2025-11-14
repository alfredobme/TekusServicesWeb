import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


export interface CustomMessageData {
  text: string;
  type: 'success' | 'error' | 'errorWithButton';
}

@Component({
  selector: 'app-custom-message',
  imports: [CommonModule],
  template: `
    <div>
      <p 
        [ngClass]="(data.type === 'errorWithButton') ? 'snackbar-text-left' : 'snackbar-text-center'" class="snackbar-text">
        {{ data.text }}
      </p>
      <div class="actions" *ngIf="data.type === 'errorWithButton'">
        <button class="button-close" (click)="close()">Accept</button>
      </div>
    </div>
  `,
  styles: [`
    .snackbar-text-center {
      text-align: center;
      margin: 0;
      white-space: pre-line;
    }
    .snackbar-text-left {
      text-align: left;
      margin: 0;
      white-space: pre-line;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
    .button-close {
      width: 110px;
      height: 30px;
      margin-top: 10px;
      border-radius: 5px;
      border: 2px solid #c62828;
      background-color: #c9cfc9;
      color: #c62828;
      font-weight: bold;
      cursor: pointer;
    }
    .button-close:hover {
      background-color: white;
    }
 `]
})
export class CustomMessageComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<CustomMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: CustomMessageData
  ) {}

  close() {
    (this.snackBarRef as any)._actionType = 'close';
    this.snackBarRef.dismissWithAction();
  }
}

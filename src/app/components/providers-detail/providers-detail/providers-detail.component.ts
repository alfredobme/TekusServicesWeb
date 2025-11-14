import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProvidersService } from '../../../services/providers/providers.service';
import { CustomMessageComponent } from '../../custom-message/custom-message/custom-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-providers-new',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './providers-detail.component.html',
  styleUrl: './providers-detail.component.css'
})
export class ProvidersDetailComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private providersService: ProvidersService, 
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProvidersDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      providerId: number; 
      nit: string
      name: string 
      email: string 
      active: boolean 
    }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      providerId: [{ value: this.data.providerId, disabled: true }],     
      nit: [ this.data.nit, [Validators.required, ]],
      name: [ this.data.name, [Validators.required, ]],
      email: [ this.data.email, [Validators.required, Validators.email ]],
      active: [ this.data.active, [Validators.required, ]],
    });
  }

  deleteProvider() {
    this.providersService.deleteProvider(this.data.providerId).subscribe({
      next: () => {
        this.showMessage('Provider removed');
        this.dialogRef.close(true);
      },  
      error: () => {
        this.showError('Error removing provider');
      }
    });
  }

  modifyProvider() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();

      this.providersService.modifyProvider(this.data.providerId, formData).subscribe({
        next: () => {
          this.showMessage('Provider modified');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showError('Error modifying provider');          
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.showError('Validate the form data');
    }
  }

  showError(message: string) {
    this.snackBar.openFromComponent(CustomMessageComponent, {
      data: { text: message, type: 'error' },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-error-toast']
    });
  }

  showMessage(message: string) {
    this.snackBar.openFromComponent(CustomMessageComponent, {
      data: { text: message, type: 'success' },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-success-toast']
    });
  }
}


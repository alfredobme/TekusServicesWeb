import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProvidersService } from '../../services/providers/providers.service';
import { CustomMessageComponent } from '../../components/custom-message/custom-message/custom-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  templateUrl: './providers-new.component.html',
  styleUrl: './providers-new.component.css'
})
export class ProvidersNewComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private providersService: ProvidersService, 
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProvidersNewComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nit: ['', [Validators.required, ]],
      name: ['', [Validators.required, ]],
      email: ['', [Validators.required, Validators.email ]],
      active: ['', [Validators.required, ]],
    });
  }

  saveProvider() {
    if (this.form.valid) {
      this.providersService.saveProvider(this.form.value).subscribe({
        next: () => {
          this.showMessage('Provider created');
          this.dialogRef.close(true);
        },  
        error: (err) => {
            let mensajeError = 'Error creating provider';

            if (err.error?.message) {
              if (err.error.message === "Validate data"){
                mensajeError = 'Provider already exists'
              }
            } 

            this.showError(mensajeError);
          }
      });
    }else{
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


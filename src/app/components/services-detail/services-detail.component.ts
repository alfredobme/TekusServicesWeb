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
import { ServicesService } from '../../services/services/services.service';
import { ProvidersService } from '../../services/providers/providers.service';
import { CountriesService } from '../../services/countries/countries.service';
import { CustomMessageComponent } from '../custom-message/custom-message/custom-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-services-detail',
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
  templateUrl: './services-detail.component.html',
  styleUrl: './services-detail.component.css'
})
export class ServicesDetailComponent {
  form!: FormGroup;
  providers: any[] = [];
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService, 
    private providersService: ProvidersService,
    private countriesService: CountriesService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ServicesDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      serviceId: number; 
      name: string
      hourlyRate: number 
      active: boolean 
      providerId: number
      countriesJson: string
    }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      serviceId: [{ value: this.data.serviceId, disabled: true }],    
      name: [ this.data.name, [Validators.required, ]],
      hourlyRate: [ this.data.hourlyRate, [Validators.required]],
      active: [ this.data.active, [Validators.required, ]],
      providerId: [ this.data.providerId, [Validators.required]],
      countries: [ this.data.countriesJson, [Validators.required, ]],
    });

    this.getCountries();
    this.getProviders();
  }

  getProviders() {
    this.providersService.getProviders().subscribe(response => {
      this.providers = response;
    });
  }


  getCountries() {
    this.countriesService.getCountries().subscribe({
      next: (response) => {
        if (!response || response.length === 0) {
          this.showError('No available countries found');
          this.dialogRef.close(false);
          return;
        }

        this.countries = response.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );

        this.setCountriesSelected(this.data.countriesJson);
      },
      error: () => {
        this.showError('An error occurred while loading countries');
        this.dialogRef.close(false);
      }
    });
  }

  setCountriesSelected(countriesJson: any) {
    const selectedCodes = Array.isArray(countriesJson)
      ? countriesJson.map((c: any) => c.code)
      : [];

    this.form.patchValue({
      countries: selectedCodes
    });
  }

  deleteService() {
    this.servicesService.deleteService(this.data.serviceId).subscribe({
      next: () => {
        this.showMessage('Service removed');
        this.dialogRef.close(true);
      },  
      error: () => {
        this.showError('Error removing service');
      }
    });
  }


  modifyService() {
    if (this.form.valid) {
      const formDataTemp = this.form.getRawValue();

      // Transformar countries en objeto { code, name }
      const transformedCountries = formDataTemp.countries.map((code: string) => {
        const country = this.countries.find(c => c.code === code);
        return country ? { code: country.code, name: country.name } : null;
      });
      const formData = {
        ...formDataTemp,
        countries: transformedCountries
      };

      this.servicesService.modifyService(this.data.serviceId, formData).subscribe({
        next: () => {
          this.showMessage('Service modified');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showError('Error modifying service');
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
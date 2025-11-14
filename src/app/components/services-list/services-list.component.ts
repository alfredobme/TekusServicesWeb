import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ServicesService } from '../../services/services/services.service';
import { Service } from '../../models/service.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ServicesDetailComponent } from '../services-detail/services-detail.component';
import { ServicesNewComponent } from '../services-new/services-new.component';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule    
  ],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.css'
})
export class ServicesListComponent implements AfterViewInit {
  displayedColumns: string[] = ['countries', 'name', 'hourlyrate', 'provider', 'active', 'actions'];
  dataSource = new MatTableDataSource<Service>();

  expandedElement: Service | null = null;

  toggleRow(service: Service): void {
    this.expandedElement = this.expandedElement === service ? null : service;
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private servicesService: ServicesService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getServices();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getServices() {
    this.servicesService.getServices().subscribe(response => {
      this.dataSource.data = response;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newService() {
    const dialogRef = this.dialog.open(ServicesNewComponent, {
      width: '900px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getServices();
      }
    });
  }

  serviceDetail(service: any) { 
    const dialogRef = this.dialog.open(ServicesDetailComponent, { 
      width: '800px',
      data: { 
        serviceId: service.serviceId,
        name: service.name, 
        hourlyRate: service.hourlyRate, 
        active: service.active, 
        providerId: service.providerId, 
        countriesJson: service.countries, 
      }});
      
      dialogRef.afterClosed().subscribe(result => {
         if (result === true) { 
          this.getServices();
         } 
      });
  }
}

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Provider } from '../../models/provider.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProvidersService } from '../../services/providers/providers.service';
import { ProvidersNewComponent } from '../providers-new/providers-new.component';
import { ProvidersDetailComponent } from '../providers-detail/providers-detail/providers-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-providers-list',
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
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['services', 'nit', 'name', 'email', 'active', 'actions'];
  dataSource = new MatTableDataSource<Provider>();

  expandedElement: Provider | null = null;

  toggleRow(provider: Provider): void {
    this.expandedElement = this.expandedElement === provider ? null : provider;
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private providersService: ProvidersService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProviders();
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

  getProviders() {
    this.providersService.getProviders().subscribe(response => {
      this.dataSource.data = response;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newProvider() {
    const dialogRef = this.dialog.open(ProvidersNewComponent, {
      width: '900px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getProviders();
      }
    });
  }

  providerDetail(provider: any) { 
    const dialogRef = this.dialog.open(ProvidersDetailComponent, { 
      width: '800px',
      data: { 
        providerId: provider.providerId, 
        nit: provider.nit, 
        name: provider.name, 
        email: provider.email, 
        active: provider.active, 
      }});
      
      dialogRef.afterClosed().subscribe(result => {
         if (result === true) { 
          this.getProviders();
         } 
      });
    }
}

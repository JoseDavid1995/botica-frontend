import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule
} from '@angular/material/paginator';import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertService } from '../services/alert';
import { AuthService } from '../service/auth.service';
import { MedicamentosService } from '../service/medicamentos.service';

export function getSpanishPaginatorIntl() {

  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Registros por página:';
  paginatorIntl.nextPageLabel = 'Siguiente página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';

  paginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) => {

    if (length === 0) {
      return `0 de 0`;
    }

    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  return paginatorIntl;
}

@Component({
  selector: 'app-inventario',
  standalone: true,
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
   providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: getSpanishPaginatorIntl
    }
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
  ]
})
export class Inventario implements AfterViewInit {

    constructor(private medicamentosService: MedicamentosService,private alertService: AlertService,  private cdr: ChangeDetectorRef) {
    }


  selection = new SelectionModel<any>(true, []);

  // Verifica si todos los elementos están seleccionados
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  displayedColumns: string[] = [
    'select',
    'id',
    'nombre',
    'sku',
    'lote',
    'cantidad',
    'precioUnitario',
    'precioTotal',
    'vencimiento',
    'acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource([
    {id:'#001',nombre:'Amoxicilina',sku:'SKU100',lote:'B01',cantidad:100,precioUnitario:15.5,precioTotal:1550,vencimiento:'2025-05-30'},
    {id:'#002',nombre:'Ibuprofeno',sku:'SKU102',lote:'B02',cantidad:50,precioUnitario:12,precioTotal:600,vencimiento:'2024-12-15'},
    {id:'#003',nombre:'Paracetamol',sku:'SKU305',lote:'B03',cantidad:150,precioUnitario:8,precioTotal:1200,vencimiento:'2025-01-10'},
    {id:'#004',nombre:'Loratadina',sku:'SKU400',lote:'B04',cantidad:200,precioUnitario:5,precioTotal:1000,vencimiento:'2026-02-20'},
    {id:'#005',nombre:'Omeprazol',sku:'SKU500',lote:'B05',cantidad:80,precioUnitario:10,precioTotal:800,vencimiento:'2025-08-15'},
    {id:'#006',nombre:'Metformina',sku:'SKU600',lote:'B06',cantidad:120,precioUnitario:7.5,precioTotal:900,vencimiento:'2025-11-30'},
    {id:'#007',nombre:'Losartán',sku:'SKU700',lote:'B07',cantidad:90,precioUnitario:9,precioTotal:810,vencimiento:'2026-01-10'},
    {id:'#008',nombre:'Aspirina',sku:'SKU800',lote:'B08',cantidad:300,precioUnitario:2,precioTotal:600,vencimiento:'2025-09-05'},
    {id:'#009',nombre:'Cetirizina',sku:'SKU900',lote:'B09',cantidad:60,precioUnitario:6,precioTotal:360,vencimiento:'2025-12-25'},
    {id:'#010',nombre:'Diclofenaco',sku:'SKU010',lote:'B10',cantidad:110,precioUnitario:4.5,precioTotal:495,vencimiento:'2025-07-12'},
    {id:'#011',nombre:'Amoxicilina Forte',sku:'SKU011',lote:'B11',cantidad:40,precioUnitario:20,precioTotal:800,vencimiento:'2026-03-01'}
  ]);

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.paginator.length = this.dataSource.data.length;

      this.dataSource._updateChangeSubscription();
    });
  }

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement)
      .value
      .trim()
      .toLowerCase();

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFileSelected(event: any) {
  
    const file: File = event.target.files[0];
    
    if (file) {
      // Validación básica de extensión
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && 
          file.type !== 'application/vnd.ms-excel') {
        this.alertService.show("Error", "Por favor, selecciona un archivo Excel válido (.xlsx o .xls).", "error");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      this.alertService.show("Procesando", "Subiendo y procesando archivo...", "success");

      // Llamada al servicio que definimos anteriormente
      this.medicamentosService.subirExcel(formData).subscribe({
        next: (res) => {
          this.alertService.show("Éxito", res.mensaje || "Archivo procesado y datos actualizados.", "success");
          //this.cargarTabla(); // Método que recarga tus datos de la tabla
        },
        error: (err) => {
          this.alertService.show("Error", "No se pudo procesar el archivo. Revisa el formato.", "error");
        }
      });
    }
  }
}
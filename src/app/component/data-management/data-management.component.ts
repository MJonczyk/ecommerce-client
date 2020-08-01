import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductDataSource } from '../../data-source/ProductDataSource';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/Product';
import { fromEvent, merge, pipe } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DataManagementComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'name', 'category', 'edit', 'delete'];
  dataSource: ProductDataSource;
  expandedProduct: Product | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.dataSource = new ProductDataSource(this.productService);
    this.dataSource.loadProducts();
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  addCategory() {
    this.router.navigate(['/addCategory']);
  }

  addProduct() {
    this.router.navigate(['/addProduct']);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      pipe(() => this.dataSource.loadProducts())
    );
  }

  editProduct(product: Product) {

  }

  loadLessonsPage() {
    this.dataSource.loadProducts(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }
}

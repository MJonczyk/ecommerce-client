import {Product} from '../model/Product';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ProductService} from '../service/product.service';
import {catchError, finalize} from 'rxjs/operators';
import {ProductsResponse} from '../model/response/ProductsResponse';

export class ProductDataSource implements DataSource<Product> {
  private productSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private dataLength: number;

  public loading$ = this.loadingSubject.asObservable();

  constructor(private productService: ProductService) {}

  connect(collectionViewer: CollectionViewer): Observable<Product[] | ReadonlyArray<Product>> {
    return this.productSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productSubject.complete();
    this.loadingSubject.complete();
  }

  get length(): number { return this.dataLength; }

  loadProducts(search = '', sortColumn = 'id', sortOrder = 'asc', page = 0, pageSize = 5) {
    this.loadingSubject.next(true);

    this.productService.getProducts(search, sortColumn, sortOrder, page, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((products: ProductsResponse) => {
        this.dataLength = products.page.totalElements;
        this.productSubject.next(products._embedded.productList);
      });
  }
}


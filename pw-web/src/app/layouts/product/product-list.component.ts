import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbModalRef, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from './product.service';
import {ProductDeleteDialogComponent} from './product-delete-dialog.component';
import {IProduct} from './product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products: IProduct[];
  protected ngbModalRef: NgbModalRef;

  constructor(private productService: ProductService, private modalService: NgbModal) {}

  public ngOnInit(): void {
    this.loadAll();
  }

  public ngOnDestroy(): void {
    this.ngbModalRef = null;
  }

  public deleteProduct(product: IProduct): void {
    this.ngbModalRef = this.modalService.open(ProductDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    this.ngbModalRef.componentInstance.product = product;
    this.ngbModalRef.result.then(
      result => {
        this.loadAll();
        this.ngbModalRef = null;
      },
      reason => {
        this.loadAll();
        this.ngbModalRef = null;
      }
    );
  }

  private loadAll(): void {
    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }
}

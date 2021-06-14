import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {isNullOrUndefined} from 'util';
import {ProductService} from './product.service';
import {IProduct, IProductPrecautions, ProductPrecautions} from './product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  public product: IProduct;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(protected activatedRoute: ActivatedRoute, private productService: ProductService, private toastr: ToastrService) {}

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe(({product}) => {
      this.product = product;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public saveProduct(): void {
    if (this.product.id === undefined) {
      this.productService.create(this.product).subscribe(
        res => {
          this.product = res;
          this.saveSucess();
        },
        error => {
          this.throwError();
        }
      );
    } else {
      this.productService.update(this.product).subscribe(
        res => {
          this.product = res;
          this.saveSucess();
        },
        error => {
          this.throwError();
        }
      );
    }
  }

  public addProductPrecaution(): void {
    if (isNullOrUndefined(this.product.productPrecautions)) {
      this.product.productPrecautions = [];
    }

    this.product.productPrecautions.push(new ProductPrecautions());
  }

  public deleteProductPrecaution(productPrecaution: IProductPrecautions): void {
    const index = this.product.productPrecautions.indexOf(productPrecaution);
    this.product.productPrecautions.splice(index, 1);
  }

  private saveSucess(): void {
    this.toastr.success('Information saved successfully', 'Sucess');
  }

  private throwError(): void {
    this.toastr.error('An error occurred on the system. Please contact the system administrator ', 'Error');
  }
}

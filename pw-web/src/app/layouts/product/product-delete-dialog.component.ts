import {Component} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ProductService} from './product.service';
import {IProduct} from './product.model';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
})
export class ProductDeleteDialogComponent {
  product: IProduct;

  constructor(protected productService: ProductService, public activeModal: NgbActiveModal, private toastr: ToastrService) {}

  public clear() {
    this.activeModal.dismiss('cancel');
  }

  public confirmDelete(id: number) {
    this.productService.delete(id).subscribe(
      response => {
        this.saveSucess();
        this.activeModal.dismiss(true);
      },
      error => {
        this.throwError();
      }
    );
  }

  private saveSucess(): void {
    this.toastr.success('Information saved successfully', 'Sucess');
  }

  private throwError(): void {
    this.toastr.error('An error occurred on the system. Please contact the system administrator ', 'Error');
  }
}

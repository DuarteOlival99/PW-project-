import {Component} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ClientService} from './client.service';
import {IClient} from './client.model';

@Component({
  selector: 'app-client-delete-dialog',
  templateUrl: './client-delete-dialog.component.html',
})
export class ClientDeleteDialogComponent {
  client: IClient;

  constructor(protected clientService: ClientService, public activeModal: NgbActiveModal, private toastr: ToastrService) {}

  public clear() {
    this.activeModal.dismiss('cancel');
  }

  public confirmDelete(id: number) {
    this.clientService.delete(id).subscribe(
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

import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbModalRef, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClientService} from './client.service';
import {ClientDeleteDialogComponent} from './client-delete-dialog.component';
import {IClient} from './client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client.scss'],
})
export class ClientListComponent implements OnInit, OnDestroy {
  public clients: IClient[];
  protected ngbModalRef: NgbModalRef;

  constructor(private clientService: ClientService, private modalService: NgbModal) {}

  public ngOnInit(): void {
    this.loadAll();
  }

  public ngOnDestroy(): void {
    this.ngbModalRef = null;
  }

  public deleteClient(client: IClient): void {
    this.ngbModalRef = this.modalService.open(ClientDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    this.ngbModalRef.componentInstance.client = client;
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
    this.clientService.getAll().subscribe(res => {
      this.clients = res;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Ticket } from '../../model/ticket.model';
import { DialogService } from '../../dialog.service';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../model/response-api';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  assignedToMe: Boolean = false;
  page: Number = 0;
  count: Number = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listTicket = [];
  ticketFilter = new Ticket('', null, '', '', '', '', null, null, '', null);

  constructor(
    private dialogService: DialogService,
    private ticketService: TicketService,
    private router: Router) {
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page.valueOf(), this.count.valueOf());
  }

  findAll(page: number, count: number) {
    this.ticketService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
        this.listTicket = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  filter(): void {
    console.log(' this.assignedToMe --> ', this.assignedToMe);
    this.page = 0;
    this.count = 5;
    this.ticketService.findByParams(this.page.valueOf(), this.count.valueOf(), this.assignedToMe.valueOf(), this.ticketFilter)
    .subscribe((responseApi: ResponseApi) => {
      this.ticketFilter.title = this.ticketFilter.title === 'uninformed' ? '' : this.ticketFilter.title;
      this.ticketFilter.number = this.ticketFilter.number === 0 ? null : this.ticketFilter.number;
      this.listTicket = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  cleanFilter(): void {
    this.assignedToMe = false;
    this.page = 0;
    this.count = 5;
    this.ticketFilter = new Ticket('', null, '', '', '', '', null, null, '', null);
    this.findAll(this.page.valueOf(), this.count.valueOf());
  }


  edit(id: string) {
    this.router.navigate(['/ticket-new', id]);
  }

  detail(id: string) {
    this.router.navigate(['/ticket-detail', id]);
  }

  delete(id: string) {
    this.dialogService.confirm('Do you want to delete the ticket ?')
      .then((candelete: boolean) => {
          if (candelete) {
            this.message = {};
            this.ticketService.delete(id).subscribe((responseApi: ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findAll(this.page.valueOf(), this.count.valueOf());
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page.valueOf() + 1 < this.pages.length) {
      this.page =  this.page.valueOf() + 1;
      this.findAll(this.page.valueOf(), this.count.valueOf());
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page =  this.page.valueOf() - 1;
      this.findAll(this.page.valueOf(), this.count.valueOf());
    }
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.findAll(this.page.valueOf(), this.count.valueOf());
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    };

    this.classCss['alert-' + type] =  true;
  }

}

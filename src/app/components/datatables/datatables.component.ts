import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {DtOptions} from './interfaces/datatables';
import {_currency} from '../../_helpers/utils';

@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrl: './datatables.component.css'
})
export class DatatablesComponent implements OnInit, OnChanges {

  @Output() rowEvent = new EventEmitter<any>();
  @Input({ required: true }) options!: DtOptions;

  page: number = 20;
  currentPage: number = 0;
  perPage: number = 0;
  pg: number = 0;

  rows: any = [];
  clones: any = [];

  sort: any;

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  }

  // we could changed this one to pipe to make everything reusable
  transformField(columnType: any, value: any): string {

    let newValue = "";

    if (columnType.name === 'date') {
      newValue = new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(new Date(value)).toString();
    }

    if (columnType.name === 'currency') {
      newValue = _currency(value);
    }

    return newValue;
  }

  eventPg() {
    this.rows = this.clones.slice(this.currentPage * this.page, (this.currentPage * this.page) + this.page);
    this.perPage = Math.ceil(this.clones.length / this.page);
  }

  ngOnInit(): void {
    this.clones = [...this.options.data];
    this.eventPg();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.clones = [...this.options.data];
    this.eventPg();
  }

  eventRow(data: any) {
    this.rowEvent.emit(data);
  }

  eventPgPage(total: string) {
    this.currentPage = 0;
    this.page = Number(total);
    this.eventPg();
  }

  eventPgMove(page: number, type: string = "default") {
    if (type === 'default') {
      this.currentPage = page;
    }

    if (type === 'previous') {

      if (this.currentPage <= 0) {
        this.currentPage = 0;
      } else {
        this.currentPage = this.currentPage - 1;
      }
    }

    if (type === 'next') {
      if (this.currentPage >= (this.perPage - 1)) {
        this.currentPage = this.perPage - 1;
      } else {
        this.currentPage = this.currentPage + 1;
      }

    }

    this.eventPg();
  }

  eventPgSort(field: string) {

    const index = this.options.columns.findIndex((i: any) => i.field === field);

    if (this.options.columns[index].sortNumber === undefined || this.options.columns[index].sortNumber === 0) {
      this.options.columns[index].sortNumber = 1;
    } else if (this.options.columns[index].sortNumber > 1) {
      this.options.columns[index].sortNumber = 0;
    } else {
      this.options.columns[index].sortNumber += 1;
    }

    if (this.options.columns[index].sortNumber) {
      if (this.options.columns[index].type === 'number') {
        this.rows = this.clones
        .sort((x: any, y: any) => {
          if (this.options.columns[index].sortNumber === 1) {
            return y[field] - x[field];
          }

          return x[field] - y[field];
        });
      }

      if (typeof this.options.columns[index]?.type === 'object') {
        this.rows = this.clones
          .sort((x: any, y: any) => {
            if (this.options.columns[index].sortNumber === 1) {
              return y[field] - x[field];
            }

            return x[field] - y[field];
          });
      }

      if (this.options.columns[index].type === 'string') {
        this.rows = this.clones
        .sort((x: any, y: any) => {
          if (this.options.columns[index].sortNumber === 1) {
            return y[field].localeCompare(x[field]);
          }

          return x[field].localeCompare(y[field]);
        });
      }
    } else {
      this.clones = [...this.options.data];
    }

    this.eventPg();
  }

}

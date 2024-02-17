import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';

import { Config } from './config';
import { DataTable } from './data';
import { PageRequest } from './pageRequest';

@Component({
  selector: 'my-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MyTableComponent {

  @Input()
  public config: Config;

  @Input()
  public data: DataTable<any>;

  public size = 5;
  public pageNumber = 0;

  @Output()
  public newPage: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();

  @Output()
  public selection: EventEmitter<number> = new EventEmitter<number>();

  public changePage(pageNum: number) {
    const num = (pageNum < 0) ? 0 :
      (pageNum >= this.data.lastPage) ? (this.data.lastPage - 1) : pageNum;

    this.pageNumber = num;

    this.newPage.emit({
      page: num,
      size: Number(this.size)
    });
  }

  public onSelect (index: number) {
    this.selection.emit(index + (this.pageNumber * this.size));
  }
}
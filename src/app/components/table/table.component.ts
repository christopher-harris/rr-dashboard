import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as _ from 'lodash';
import {DataRecord, DataRecordKeysEnum} from '../../store/state/data-record.model';

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'rr-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any[];
  @Input() columns: any[];

  @Output() editRecord: EventEmitter<DataRecord> = new EventEmitter<DataRecord>();

  displayData: any[];
  sortedColumn: string = 'created';
  sortDirection: SortDirection = 'desc';

  dataRecordEnum = DataRecordKeysEnum;

  constructor() { }

  ngOnInit(): void {
    this.sortTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].isFirstChange()) {
      // do nothing
    } else {
      this.sortTable();
    }
  }

  sortTable() {
    this.displayData = _.orderBy(this.data, [this.sortedColumn], [this.sortDirection]);
  }

  changeTableSorting(event: any) {
    if (event.key === this.sortedColumn) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortedColumn = event.key;
    }
    this.sortTable();
  }

  onEditClick(record: DataRecord) {
    this.editRecord.emit(record);
  }

}

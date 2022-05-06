import {Component, OnInit, TemplateRef} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import * as dataStore from '../../../store/data';
import {
  FilterDates,
  getEarliestDate,
  getOldestDate,
  JsDateRange,
  PropertyFilter,
  SearchData,
  SetPropertyFilters,
  UpdateRecord
} from '../../../store/data';
import {DataRecord, DataRecordKeysEnum} from '../../../store/state/data-record.model';
import {KeyValue} from '@angular/common';
import {NgbDateAdapter, NgbDateStruct, NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DateRange} from '../../../../../projects/ui/src/lib/components';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'rr-full-data',
  templateUrl: './full-data.component.html',
  styleUrls: ['./full-data.component.scss']
})
export class FullDataComponent implements OnInit {
  titleFilterControl: FormControl = new FormControl('');
  searchForm: FormControl = new FormControl('');
  oldestCreatedRecordDate$: Observable<any> = this.store.pipe(
    select(getOldestDate),
    map((date: any) => {
      return this.convertStringDateToNgbDate(date);
    })
  );
  earliestModifiedRecordDate$: Observable<any> = this.store.pipe(
    select(getEarliestDate),
    map((date: any) => {
      return this.convertStringDateToNgbDate(date);
    })
  );
  records$: Observable<any> = this.store.pipe(select(dataStore.selectAllRecords));
  dataProperties = DataRecordKeysEnum;
  recordKeys = new Map<any, any>();
  titleFilter$: Observable<any> = this.store.pipe(select(dataStore.selectPropertyFilterValues, 'title'));
  projectManagersFilter$: Observable<any> = this.store.pipe(select(dataStore.selectPropertyFilterValues, 'project_owner'));
  divisionFilter$: Observable<any> = this.store.pipe(select(dataStore.selectPropertyFilterValues, 'division'));
  statusFilter$: Observable<any> = this.store.pipe(select(dataStore.selectPropertyFilterValues, 'status'));
  selectedFilters: PropertyFilter[] = [
    {property: 'title', values: []},
    {property: 'project_owner', values: []},
    {property: 'division', values: []},
    {property: 'status', values: []},
  ];
  editingRecordForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    division: new FormControl(''),
    project_owner: new FormControl(''),
    budget: new FormControl(''),
    status: new FormControl(''),
    id: new FormControl(''),
  });

  constructor(private store: Store<any>,
              private dateAdapter: NgbDateAdapter<any>,
              private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    (Object.keys(DataRecordKeysEnum) as Array<keyof typeof DataRecordKeysEnum>).map((key) => {
      this.recordKeys.set(key, DataRecordKeysEnum[key]);
    });
    this.store.dispatch(new dataStore.GetData());
    this.records$.subscribe(x => console.log(x));
    this.searchForm.valueChanges.subscribe((value) => {
      this.store.dispatch(new SearchData(value));
    });
    this.titleFilterControl.valueChanges.subscribe((value) => {
      console.log(value);
    })
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  convertStringDateToNgbDate(dateString: string): NgbDateStruct | null {
    const jsDate = new Date(Date.parse(dateString));
    const ngbDate: NgbDateStruct | null = this.dateAdapter.fromModel(jsDate);
    return ngbDate;
  }

  onDatesChanged(dateRange: DateRange) {
    const jsDateRange: JsDateRange = {
      from: this.dateAdapter.toModel(dateRange.from) as Date,
      to: this.dateAdapter.toModel(dateRange.to) as Date,
    };
    this.store.dispatch(new FilterDates(jsDateRange));
  }

  getPropertyFilterValues(something: any) {
    console.log(something);
  }

  addPropertyFilter(property: any, value: any) {
    console.table(property, value);
    this.selectedFilters.find((filter) => {
      if (filter.property === property) {
        filter.values = [value];
      }
    })
    this.store.dispatch(new SetPropertyFilters(this.selectedFilters));
  }

  editRecord(record: DataRecord) {
    this.editingRecordForm.patchValue(record);
  }

  openEditDrawer(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {position: 'end'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
      this.store.dispatch(new UpdateRecord({
        ...this.editingRecordForm.value,
        budget: +this.editingRecordForm.get('budget')?.value,
        modified: new Date().toString()
      }));
    }, (reason) => {
      console.log(`Dismissed ${this.getDrawerDismissReason(reason)}`);
      this.editingRecordForm.reset();
    });
  }

  private getDrawerDismissReason(reason: any) {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

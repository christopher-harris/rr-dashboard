import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepicker,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

export interface DateRange {
  from: NgbDate | null;
  to: NgbDate | null;
}

@Component({
  selector: 'ui-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
  @ViewChild(NgbDatepicker) datepicker: NgbDatepicker;
  @Input() oldestDate: NgbDateStruct;
  @Input() earliestDate: NgbDateStruct;
  @Output() datesChanged: EventEmitter<any> = new EventEmitter<any>();
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private calendar: NgbCalendar,
              public ngbDateAdapter: NgbDateAdapter<any>,
              public formatter: NgbDateParserFormatter) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
  }

  onDateSelection(date: NgbDate) {
    console.log(this.ngbDateAdapter.toModel(date));
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    const range: DateRange = {from: this.fromDate, to: this.toDate};
    this.datesChanged.emit(range);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  clearDates() {
    this.toDate = null;
    this.fromDate = null;
    const range: DateRange = {from: this.fromDate, to: this.toDate};
    this.datesChanged.emit(range);
  }

}

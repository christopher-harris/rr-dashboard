import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataByDivisionComponent} from './data-by-division.component';

describe('DataByDivisionComponent', () => {
  let component: DataByDivisionComponent;
  let fixture: ComponentFixture<DataByDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataByDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataByDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

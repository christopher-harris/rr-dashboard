import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataByOwnerComponent} from './data-by-owner.component';

describe('DataByOwnerComponent', () => {
  let component: DataByOwnerComponent;
  let fixture: ComponentFixture<DataByOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataByOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataByOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

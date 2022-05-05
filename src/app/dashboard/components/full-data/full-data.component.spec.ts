import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FullDataComponent} from './full-data.component';

describe('FullDataComponent', () => {
  let component: FullDataComponent;
  let fixture: ComponentFixture<FullDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

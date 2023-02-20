import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptychartComponent } from './emptychart.component';

describe('EmptychartComponent', () => {
  let component: EmptychartComponent;
  let fixture: ComponentFixture<EmptychartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptychartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

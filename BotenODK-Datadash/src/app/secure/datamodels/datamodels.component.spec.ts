import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamodelsComponent } from './datamodels.component';

describe('DatamodelsComponent', () => {
  let component: DatamodelsComponent;
  let fixture: ComponentFixture<DatamodelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatamodelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatamodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

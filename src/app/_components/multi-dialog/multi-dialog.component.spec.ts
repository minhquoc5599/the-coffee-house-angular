import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDialogComponent } from './multi-dialog.component';

describe('MultiDialogComponent', () => {
  let component: MultiDialogComponent;
  let fixture: ComponentFixture<MultiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

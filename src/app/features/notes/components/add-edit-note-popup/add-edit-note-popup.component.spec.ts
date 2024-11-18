import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNotePopupComponent } from './add-edit-note-popup.component';

describe('AddEditNotePopupComponent', () => {
  let component: AddEditNotePopupComponent;
  let fixture: ComponentFixture<AddEditNotePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditNotePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditNotePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsContainerComponent } from './sections-container.component';

describe('SectionsComponent', () => {
  let component: SectionsContainerComponent;
  let fixture: ComponentFixture<SectionsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

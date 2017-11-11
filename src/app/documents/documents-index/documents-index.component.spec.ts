import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsIndexComponent } from './documents-index.component';

describe('DocumentsIndexComponent', () => {
  let component: DocumentsIndexComponent;
  let fixture: ComponentFixture<DocumentsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

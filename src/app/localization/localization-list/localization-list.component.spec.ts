import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationListComponent } from './localization-list.component';

describe('LocalizationListComponent', () => {
  let component: LocalizationListComponent;
  let fixture: ComponentFixture<LocalizationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

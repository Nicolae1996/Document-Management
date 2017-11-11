import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationEditKeyComponent } from './localization-edit-key.component';

describe('LocalizationEditKeyComponent', () => {
  let component: LocalizationEditKeyComponent;
  let fixture: ComponentFixture<LocalizationEditKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizationEditKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizationEditKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

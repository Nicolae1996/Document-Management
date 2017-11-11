import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationAddLanguageComponent } from './localization-add-language.component';

describe('LocalizationAddLanguageComponent', () => {
  let component: LocalizationAddLanguageComponent;
  let fixture: ComponentFixture<LocalizationAddLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizationAddLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizationAddLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

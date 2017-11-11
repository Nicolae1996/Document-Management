import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationCreateKeyComponent } from './localization-create-key.component';

describe('LocalizationCreateKeyComponent', () => {
  let component: LocalizationCreateKeyComponent;
  let fixture: ComponentFixture<LocalizationCreateKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizationCreateKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizationCreateKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenpageComponent } from './hiddenpage.component';

describe('HiddenpageComponent', () => {
  let component: HiddenpageComponent;
  let fixture: ComponentFixture<HiddenpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddenpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

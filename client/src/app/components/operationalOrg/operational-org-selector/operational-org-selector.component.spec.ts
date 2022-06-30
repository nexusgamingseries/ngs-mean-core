import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalOrgSelectorComponent } from './operational-org-selector.component';

describe('OperationalOrgSelectorComponent', () => {
  let component: OperationalOrgSelectorComponent;
  let fixture: ComponentFixture<OperationalOrgSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalOrgSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalOrgSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

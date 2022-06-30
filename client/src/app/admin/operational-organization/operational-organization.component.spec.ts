import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalOrganizationComponent } from './operational-organization.component';

describe('OperationalOrganizationComponent', () => {
  let component: OperationalOrganizationComponent;
  let fixture: ComponentFixture<OperationalOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

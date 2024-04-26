import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchManagementComponent } from './match-edit.component';

describe('MatchManagementComponent', () => {
  let component: MatchManagementComponent;
  let fixture: ComponentFixture<MatchManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [MatchManagementComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOverViewPaneComponent } from './team-over-view-pane.component';

describe('TeamOverViewPaneComponent', () => {
  let component: TeamOverViewPaneComponent;
  let fixture: ComponentFixture<TeamOverViewPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamOverViewPaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamOverViewPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

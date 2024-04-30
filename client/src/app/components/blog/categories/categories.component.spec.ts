import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: BlogCategoriesComponent;
  let fixture: ComponentFixture<BlogCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [BlogCategoriesComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

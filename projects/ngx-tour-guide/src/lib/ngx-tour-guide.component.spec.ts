import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTourGuideComponent } from './ngx-tour-guide.component';

describe('NgxTourGuideComponent', () => {
  let component: NgxTourGuideComponent;
  let fixture: ComponentFixture<NgxTourGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTourGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTourGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

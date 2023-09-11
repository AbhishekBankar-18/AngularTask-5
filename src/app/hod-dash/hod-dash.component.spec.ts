import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodDashComponent } from './hod-dash.component';

describe('HodDashComponent', () => {
  let component: HodDashComponent;
  let fixture: ComponentFixture<HodDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HodDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

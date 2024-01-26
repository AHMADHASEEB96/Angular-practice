import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingCardComponent } from './routing-card.component';

describe('RoutingCardComponent', () => {
  let component: RoutingCardComponent;
  let fixture: ComponentFixture<RoutingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutingCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

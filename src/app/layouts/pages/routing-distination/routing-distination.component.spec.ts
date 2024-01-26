import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDistinationComponent } from './routing-distination.component';

describe('RoutingDistinationComponent', () => {
  let component: RoutingDistinationComponent;
  let fixture: ComponentFixture<RoutingDistinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutingDistinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutingDistinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderItemComponent } from './user-order-item.component';

describe('UserOrderItemComponent', () => {
  let component: UserOrderItemComponent;
  let fixture: ComponentFixture<UserOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

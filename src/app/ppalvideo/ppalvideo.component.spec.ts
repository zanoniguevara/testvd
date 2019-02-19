import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpalvideoComponent } from './ppalvideo.component';

describe('PpalvideoComponent', () => {
  let component: PpalvideoComponent;
  let fixture: ComponentFixture<PpalvideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpalvideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpalvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

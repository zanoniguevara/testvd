import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtlvideoComponent } from './extlvideo.component';

describe('ExtlvideoComponent', () => {
  let component: ExtlvideoComponent;
  let fixture: ComponentFixture<ExtlvideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtlvideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtlvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

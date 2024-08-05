import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycountCoutputComponent } from './mycount-coutput.component';

describe('MycountCoutputComponent', () => {
  let component: MycountCoutputComponent;
  let fixture: ComponentFixture<MycountCoutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycountCoutputComponent]
    });
    fixture = TestBed.createComponent(MycountCoutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

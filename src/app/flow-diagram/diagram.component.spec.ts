import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowDiagramComponent } from './diagram.component';

describe('FlowDiagramComponent', () => {
  let component: FlowDiagramComponent;
  let fixture: ComponentFixture<FlowDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlowDiagramComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

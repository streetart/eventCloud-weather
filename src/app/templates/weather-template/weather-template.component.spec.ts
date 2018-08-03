import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTemplateComponent } from './weather-template.component';

describe('WeatherTemplateComponent', () => {
  let component: WeatherTemplateComponent;
  let fixture: ComponentFixture<WeatherTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

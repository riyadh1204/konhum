import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatadiriPage } from './datadiri.page';

describe('DatadiriPage', () => {
  let component: DatadiriPage;
  let fixture: ComponentFixture<DatadiriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatadiriPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatadiriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

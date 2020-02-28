import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvokatPage } from './advokat.page';

describe('AdvokatPage', () => {
  let component: AdvokatPage;
  let fixture: ComponentFixture<AdvokatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvokatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvokatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

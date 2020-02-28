import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbahdatadiriPage } from './ubahdatadiri.page';

describe('UbahdatadiriPage', () => {
  let component: UbahdatadiriPage;
  let fixture: ComponentFixture<UbahdatadiriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbahdatadiriPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbahdatadiriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

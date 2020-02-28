import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatatransaksiPage } from './datatransaksi.page';

describe('DatatransaksiPage', () => {
  let component: DatatransaksiPage;
  let fixture: ComponentFixture<DatatransaksiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatransaksiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatatransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

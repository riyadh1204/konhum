import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiwayattransaksiPage } from './riwayattransaksi.page';

describe('RiwayattransaksiPage', () => {
  let component: RiwayattransaksiPage;
  let fixture: ComponentFixture<RiwayattransaksiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiwayattransaksiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiwayattransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

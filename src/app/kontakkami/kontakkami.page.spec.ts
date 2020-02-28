import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KontakkamiPage } from './kontakkami.page';

describe('KontakkamiPage', () => {
  let component: KontakkamiPage;
  let fixture: ComponentFixture<KontakkamiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontakkamiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KontakkamiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArtikelPage } from './artikel.page';

describe('ArtikelPage', () => {
  let component: ArtikelPage;
  let fixture: ComponentFixture<ArtikelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtikelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtikelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

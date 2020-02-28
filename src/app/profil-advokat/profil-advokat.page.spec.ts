import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilAdvokatPage } from './profil-advokat.page';

describe('ProfilAdvokatPage', () => {
  let component: ProfilAdvokatPage;
  let fixture: ComponentFixture<ProfilAdvokatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilAdvokatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilAdvokatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

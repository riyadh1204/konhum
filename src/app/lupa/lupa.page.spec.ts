import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LupaPage } from './lupa.page';

describe('LupaPage', () => {
  let component: LupaPage;
  let fixture: ComponentFixture<LupaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LupaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LupaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

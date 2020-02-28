import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivechatPage } from './livechat.page';

describe('LivechatPage', () => {
  let component: LivechatPage;
  let fixture: ComponentFixture<LivechatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivechatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivechatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

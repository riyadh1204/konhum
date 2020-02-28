import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatmsgPage } from './chatmsg.page';

describe('ChatmsgPage', () => {
  let component: ChatmsgPage;
  let fixture: ComponentFixture<ChatmsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatmsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatmsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

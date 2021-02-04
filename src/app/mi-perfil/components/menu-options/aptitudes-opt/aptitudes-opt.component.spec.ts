import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AptitudesOptComponent } from './aptitudes-opt.component';

describe('AptitudesOptComponent', () => {
  let component: AptitudesOptComponent;
  let fixture: ComponentFixture<AptitudesOptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptitudesOptComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AptitudesOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

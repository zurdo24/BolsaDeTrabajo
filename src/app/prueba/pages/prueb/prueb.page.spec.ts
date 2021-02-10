import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PruebPage } from './prueb.page';

describe('PruebPage', () => {
  let component: PruebPage;
  let fixture: ComponentFixture<PruebPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PruebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SinConeccionPage } from './sin-coneccion.page';

describe('SinConeccionPage', () => {
  let component: SinConeccionPage;
  let fixture: ComponentFixture<SinConeccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinConeccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SinConeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

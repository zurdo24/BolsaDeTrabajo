import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacantComponent } from './vacant.component';

describe('VacantComponent', () => {
  let component: VacantComponent;
  let fixture: ComponentFixture<VacantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

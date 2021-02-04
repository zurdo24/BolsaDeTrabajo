import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacantsPage } from './vacants.page';

describe('VacantsPage', () => {
  let component: VacantsPage;
  let fixture: ComponentFixture<VacantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

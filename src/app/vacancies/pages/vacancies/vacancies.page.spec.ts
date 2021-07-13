import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacanciesPage } from './vacancies.page';

describe('VacanciesPage', () => {
  let component: VacanciesPage;
  let fixture: ComponentFixture<VacanciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacanciesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacanciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

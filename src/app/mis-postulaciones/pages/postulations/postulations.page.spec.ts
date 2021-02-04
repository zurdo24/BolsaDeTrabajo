import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostulationsPage } from './postulations.page';

describe('PostulationsPage', () => {
  let component: PostulationsPage;
  let fixture: ComponentFixture<PostulationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostulationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarPerfilBasicoSkeletonComponent } from './editar-perfil-basico-skeleton.component';

describe('EditarPerfilBasicoSkeletonComponent', () => {
  let component: EditarPerfilBasicoSkeletonComponent;
  let fixture: ComponentFixture<EditarPerfilBasicoSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPerfilBasicoSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPerfilBasicoSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

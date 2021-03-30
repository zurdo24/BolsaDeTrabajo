import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-perfil-basico-skeleton',
  templateUrl: './editar-perfil-basico-skeleton.component.html',
  styleUrls: ['./editar-perfil-basico-skeleton.component.scss'],
})
export class EditarPerfilBasicoSkeletonComponent implements OnInit {
  @Input() view = true;
  constructor() { }

  ngOnInit() {}

}

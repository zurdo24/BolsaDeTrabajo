import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LanguageService } from 'src/app/mi-perfil/services/language.service';
import { LanguageList, LevelList, Language } from 'src/app/shared/interfaces';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-languages-opt',
  templateUrl: './languages-opt.component.html',
  styleUrls: ['./languages-opt.component.scss'],
})
export class LanguagesOptComponent implements OnInit {
  id: string;
  list: LanguageList;
  level: LevelList;
  language: Language;
  levelstart = '1';
  languagestart = '1';

  // ----- formato para almacenar la informacion a actualizar------
  data: FormGroup;
  // --------------------------------------------------------------
  constructor(private route: ActivatedRoute, private uiService: UiService, private languageService: LanguageService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.languageService.getListComplete().subscribe( list => {
      this.list = list;
    });
    this.languageService.getLevelListComplete().subscribe( level => {
      this.level = level;
    });

    if ( this.id){

    }

  }

  initForm() {
    this.data = new FormGroup({
    id : new FormControl(''),
    cv_id: new FormControl(''),
    language_list_id: new FormControl(''),
    level_list_id: new FormControl(''),
    });
  }

  initDataEdit() {
    this.data = new FormGroup({
      id: new FormControl(''),
      cv_id: new FormControl(''),
      language_list_id: new FormControl(''),
      level_list_id: new FormControl(''),
    });
  }

}

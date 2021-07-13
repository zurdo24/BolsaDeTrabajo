import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { Organization } from 'src/app/shared/interfaces';
import { getStorage } from 'src/app/shared/services/storage.service';
import { OrganizationService } from 'src/app/vacantes/services/organization.service';
import { environment } from 'src/environments/environment';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  contact_id: string;
  cv_id: string;
  messages: Message;
  organization: Organization;
  // URL = environment.urlPhotos;
  logo = null;
  newMessage = '';

  @ViewChild(IonContent, {static: false}) content: IonContent;
  // tslint:disable-next-line: max-line-length
  constructor( private route: ActivatedRoute, private navCtrl: NavController, private messageService: MessageService, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.contact_id = this.route.snapshot.paramMap.get('id');
    getStorage('id').then( candidateId => {
      this.cv_id = candidateId;
      this.messageService.getChat(candidateId, this.contact_id).subscribe(chat => {
      this.messages = chat;
      this.organizationService.getOrganization(this.contact_id).subscribe(org => {
        this.organization = org;
        this.organizationService.getLogo(this.contact_id).subscribe(logo => {
          // if (logo != null) {
          //   this.logo = this.URL + '/btuady/public_html/' + logo;
          // }
          this.baja();
        });
      });
      this.seeMessage();
    });
    });

  }
  sendMessage(){
    if (this.newMessage.trim() === '') {
      this.newMessage = '';
    } else {
      this.messageService.addMessage(this.cv_id, this.contact_id, this.newMessage.trim(), '').subscribe(message => {
        this.ngOnInit();
      });
      this.newMessage = '';
    }
  }

  seeMessage(){
    for (const i in this.messages) {
      if (this.messages[i].date_read == null && this.messages[i].type === 'received'){
        this.messageService.seeMessages(this.messages[i].id).subscribe(message => {
        });
      }
    }
  }

  baja(){
    this.content.scrollToBottom(10);
  }

  goLinkVacant(id: string){
            this.navCtrl.navigateForward('/vacants/vacant/c/' + id);

  }
  goLinkUser(id: string){
            this.navCtrl.navigateRoot('/perfil-basico');

  }

// getNowDate(){
//   const date = new Date(); // Fecha actual
//   const monthN = date.getMonth() + 1; // obteniendo mes
//   const dayN = date.getDate(); // obteniendo dia
//   const year = date.getFullYear(); // obteniendo año
//   const HH = date.getHours();
//   const MM = date.getMinutes();
//   const SS = date.getSeconds();
//   let day;
//   let month;
//   let HHH;
//   let MMM;
//   let SSS;
// // 	horas
//   if (HH < 10) {
//      HHH = '0' + HH.toString();
//   } // agrega cero si el menor de 10
//   else {
//     HHH = HH;
//   }

//   if (MM < 10) {
//      MMM = '0' + MM.toString();
// } // agrega cero si el menor de 10
//   else {
//   MMM = MM;
// }

//   if (SS < 10) {
//      SSS = '0' + SS.toString();
//   } // agrega cero si el menor de 10
//   else {
//     SSS = SS;
//   }


//   if (dayN < 10) {
//     day = '0' + dayN;
//   } // agrega cero si el menor de 10
//   else {
//     day = dayN;
//   }

//   if (monthN < 10) {
//     month = '0' + monthN;
//   } // agrega cero si el menor de 10
//   else {
//   month = monthN;
//   }

//   // console.log(year+"-"+month+"-"+day+" "+HHH+":"+MMM+":"+SSS)
//   return year + '-' + month + '-' + day + ' ' + HHH + ':' + MMM + ':' + SSS;
// }

}

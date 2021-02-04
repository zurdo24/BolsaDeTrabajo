import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { contactsChat } from 'src/app/shared/interfaces';
import { JobApplicationStatusLogService } from 'src/app/vacantes/services/job-application-status-log.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  URL = environment.urlPhotos;
  logo = this.URL + '/btuady/public_html/';
  chats: contactsChat;

  constructor(public jobApplicationStatusLogService: JobApplicationStatusLogService, private navCtrl: NavController) { }

  ngOnInit() {
    const candidateId = JSON.parse( localStorage.getItem('_cap_id'));
    this.jobApplicationStatusLogService.getContacts(candidateId).subscribe(chats => {
      this.chats = chats;
    });
  }
  gotoChat(id: string){
    this.navCtrl.navigateRoot('/messages/chat/' + id, {animated: true});

  }
  doRefresh( event ){
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

}

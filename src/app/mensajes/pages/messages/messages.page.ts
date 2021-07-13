import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { contactsChat } from 'src/app/shared/interfaces';
import { getStorage } from 'src/app/shared/services/storage.service';
import { JobApplicationStatusLogService } from 'src/app/vacantes/services/job-application-status-log.service';
import { environment } from 'src/environments/environment';
import { DisconnectedService } from './../../../shared/services/disconnected.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  chats: contactsChat;

  constructor(public jobApplicationStatusLogService: JobApplicationStatusLogService,
              private disccService: DisconnectedService, private navCtrl: NavController) { }
  ionViewWillEnter(){
    this.disccService.seturl('/messages');
    getStorage('id').then( candidateId => {
      this.jobApplicationStatusLogService.getContacts(candidateId).subscribe(chats => {
        this.chats = chats;
      });
    });
  }
  ngOnInit() {

  }
  gotoChat(id: string){
    this.navCtrl.navigateForward('/messages/chat/' + id, {animated: true});

  }
  doRefresh( event ){
    const candidateId = JSON.parse( localStorage.getItem('_cap_id'));
    this.jobApplicationStatusLogService.getContacts(candidateId).pipe(
      finalize(async () => {
        event.target.complete();
      })
    ).subscribe(chats => {
      this.chats = chats;
    });
  }

}

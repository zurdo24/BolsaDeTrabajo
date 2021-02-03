import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // console.log(document.getElementById('tabs'));
    // document.getElementById('tabs').classList.add('hidden');
    // console.log( ) ;
  }
  onClick(val: any){
    // val.tabBar.el.hidden = true;
    // console.log(val.tabBar.el.hidden);

    // console.log(document.getElementById('tabs').classList.add('hidden') ) ;

  }

}

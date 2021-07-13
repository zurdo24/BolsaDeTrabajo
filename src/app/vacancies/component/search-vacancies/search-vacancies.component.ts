import { Component, OnInit } from '@angular/core';
import { JobOpeningService } from 'src/app/mis-oportunidades/services/job-opening.service';
import { Vacant } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-search-vacancies',
  templateUrl: './search-vacancies.component.html',
  styleUrls: ['./search-vacancies.component.scss'],
})
export class SearchVacanciesComponent implements OnInit {
  jobsOpening: Vacant[];
  searching = false;
  constructor(private jobOpeningService: JobOpeningService) { }

  ngOnInit() {}
  search(event) {
    const text: string = event.detail.value;

    if ( text.length === 0 ) {
      this.searching = false;
      this.jobsOpening = [];
      return;
    }

    this.searching = true;

    this.jobOpeningService.searchJobOpen(text).subscribe(jobs => {
      this.jobsOpening = jobs;
      console.log(jobs);
      this.searching = false;
    });


  }
}

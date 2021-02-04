import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrosVacant'
})
export class FiltrosVacantPipe implements PipeTransform {

  // tslint:disable-next-line: max-line-length
  transform(array: any[], job: string, years: string, typeJob: string, city: string, studyPrograme: string, subjectArea: string, sueldo: string): any[] {

    // ======================= listos ======================

    // =========== filtro de años de experiencia ===========
    if (years !== '') {
      array = array.filter(item => {
        if (Number(item.years_experience) <= Number(years)) {
          // console.log(item.years_experience)
          return true;
        }
        else { return false; }
      });
    }

    // =========== filtro de typeJob ===========
    if (typeJob !== '') {
      array = array.filter(item => {
        if (item.job_type_id === typeJob) {
          // console.log(item.job_type_id)
          return true;
        }
        else { return false; }
      });
    }

    // =========== filtro de ciudad  ===========
    if (city !== '' && city !== undefined) {
      // console.log("city "+city)
      city = city.toLowerCase();
      array = array.filter(item => {
        return item.city_name.toLowerCase().includes(city);
      });
    }

    // =========== filtro de studyPrograme plan de estudio ===========
    if (studyPrograme !== '') {
      array = array.filter(item => {
        let arrayInarray: any[];
        arrayInarray = item.studyprogramme.filter(subItem => {
          if (subItem.id === studyPrograme) {
            return true;
          }
          else {
            return false;
          }
        });
        if (typeof arrayInarray !== 'undefined' && arrayInarray != null && arrayInarray.length > 0) {
          // console.log(item)
          return true;
        }
        else {
          return false;
        }
      });
    }

    // =========== filtro de subjectArea area de trabajo ===========
    if (subjectArea !== '') {
      array = array.filter(item => {
        if (item.subject_area_id === subjectArea) {
          return true;
        }
        else {
          return false;
        }
      });
      // console.log(array)
    }

    // =========== filtro de sueldo ===========

    if (sueldo !== '') {
      array = array.filter(item => {
        if (Number(item.salary) >= Number(sueldo)) {
          // console.log(item.salary)
          return true;
        }
        else {
          return false;
        }
      });

    }

    // =========== busqueda de nombre de trabajo ===========
    if (job !== '') {
      job = job.toLowerCase();
      array = array.filter(item => {
        return item.job_title.toLowerCase().includes(job);
      });
    }


    // console.log(array)

    return array;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL = environment.url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(logo: string, contactId: string): string {
    if (!logo) {
      return 'https://www.bolsadetrabajo.uady.mx/files/organization.png';
    }
    return `${URL}/api/organization/view-logo/?id=${contactId}`;
  }

}

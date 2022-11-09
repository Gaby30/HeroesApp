import { Pipe, PipeTransform } from '@angular/core';
import { Heore } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heore): string {
    if (!heroe.id || heroe.alt_img === '') {
      return 'assets/no-image.png';
    } else if (heroe.alt_img) {
      return heroe.alt_img
    } else {
      return `assets/heroes/${heroe.id}.jpg`;
    }
    
    
    //"assets/heroes/" + heroe.id + ".jpg";
    //|| heroe.alt_img === ''
  }

}

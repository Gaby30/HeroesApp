import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; 
import { Heore } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img{
        width:100%;
        border-radius:5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heore;
  id: string = '';

  constructor(private activedRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router : Router) { }

  ngOnInit(): void {
    
    this.activedRoute.params
      .pipe(
        switchMap(({ id }) => 
          this.heroeService.getHeorePorId(id)
        )
      )
      .subscribe(heroe => {
        this.heroe = heroe;
      });
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }

}

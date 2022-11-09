import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heore } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heore[] = [];

  constructor(private heroeService:HeroesService) { }

  ngOnInit(): void {

    this.heroeService.getHeores()
      .subscribe(resp => {
        this.heroes = resp;
      });
  }



}

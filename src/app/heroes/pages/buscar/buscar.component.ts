import { Component, OnInit } from '@angular/core';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { Heore } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heore[] = [];

  heroeSeleccionado!: Heore | undefined;

  constructor(private heroeService:HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroeService.getSugerencias(this.termino.trim())
      .subscribe(resp => {
        this.heroes = resp;
      });
  }

  opcionSeleccionada(event: MatAutocompleteActivatedEvent) {

    if (!event.option.value) {
      this.heroeSeleccionado = undefined
      return;
    }

    const heroe: Heore = event.option.value;

    this.termino = heroe.superhero;

    this.heroeService.getHeorePorId(heroe.id!)
    .subscribe(resp => {
      this.heroeSeleccionado = resp;
    });
  }

}

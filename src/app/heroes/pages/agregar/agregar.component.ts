import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute,Router } from '@angular/router'; 
import { switchMap } from 'rxjs/operators';
import { Heore, Publisher} from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img{
        width:100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heore = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img:''
  }

  constructor(private heroeService : HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => 
        this.heroeService.getHeorePorId(id)
      )
    )
    .subscribe(heroe => {
      this.heroe = heroe;
    });
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    
    if(this.heroe.id){
      this.heroeService.updateHeroe(this.heroe)
      .subscribe(resp => this.mostrarSnackbar('Registro actualizado...')); 

    }else{
      this.heroeService.addHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar('Registro creado...');
      }); 
    } 
  }

  delete() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      data: { ...this.heroe }
    });

    dialog.afterClosed()
      .subscribe(resp => {
        if (resp) {
          this.heroeService.deleteHeroe(this.heroe.id!)
            .subscribe(heroe => {
              this.router.navigate(['/heroes']);
            });
        }
      });
  }

  mostrarSnackbar(mensaje : string) {
    this.snackBar.open(mensaje, 'Ok', {
      duration: 2500
    });
  }

}

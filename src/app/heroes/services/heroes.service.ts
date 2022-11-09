import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heore } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlAPI: string = environment.urlApi;

  constructor(private http: HttpClient) { }
  
  getHeores() : Observable<Heore[]>{
    return this.http.get<Heore[]>(`${this.urlAPI}/heroes`)
  }

  getHeorePorId(id:string):Observable<Heore> {
    return this.http.get<Heore>(`${this.urlAPI}/heroes/${id}`)
  }

  getSugerencias(termino:string) : Observable<Heore[]>{
    return this.http.get<Heore[]>(`${this.urlAPI}/heroes?q=${termino}&_limit=6`);
  }

  addHeroe(heroe:Heore) : Observable<Heore>{
    return this.http.post<Heore>(`${this.urlAPI}/heroes`,heroe);
  }

  updateHeroe(heroe:Heore) : Observable<Heore>{
    return this.http.put<Heore>(`${this.urlAPI}/heroes/${heroe.id}`,heroe);
  }

  deleteHeroe(id:string) : Observable<any>{
    return this.http.delete<any>(`${this.urlAPI}/heroes/${id}`);
  }

}

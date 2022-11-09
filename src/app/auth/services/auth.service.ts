import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAPI: string = environment.urlApi;
  private _auth: Auth | undefined;

  get auth() {
    return {...this._auth}
  }

  constructor(private http: HttpClient) { }

  login() : Observable<Auth> {
    return this.http.get<Auth>(`${this.urlAPI}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token',auth.id))
      );
  }

  logout() {
    return this._auth = undefined;
  }

  verificarAutenticacion() : Observable<boolean>{
    
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.urlAPI}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth;
          return true;
        })
      );
  }
}

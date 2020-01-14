import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate {

  constructor(
    private wsSocket: WebsocketService,
    private router: Router
  ) { }

  canActivate() {

    // comprobamos si existe usuario
    // console.log(this.wsSocket.getUsuario());

    if (this.wsSocket.getUsuario()) {
      return true;
    } else {
      // si el usuario no existe lo devolvemos a la raiz
      this.router.navigateByUrl('/');
      return false;

    }

  }

}

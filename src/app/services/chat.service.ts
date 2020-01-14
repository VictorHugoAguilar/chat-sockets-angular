import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})

// comunicacion entre usuarios y otras cosas

export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage(mensaje: string) {
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  // Creamos un metodo para escuchar mensajes
  getMessage() {
    return this.wsService.listen('nuevo-mensaje');
  }

  // creamos un método para escuchar los mensajes privados
  getMessagePrivate() {
    return this.wsService.listen('mensaje-privado');
  }

  // creamos un método para escuchar todos los usuarios activos
  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }

  // creamos un mñetodo para emitir los usuarios activos
  emitirUsuariosActivos() {
    return this.wsService.emit('obtener-usuarios');
  }

}

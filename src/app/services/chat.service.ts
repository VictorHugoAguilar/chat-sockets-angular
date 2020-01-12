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
      de: 'Victor',
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  // Creamos un metodo para escuchar mensajes
  getMessage() {
    return this.wsService.listen('nuevo-mensaje');
  }

}

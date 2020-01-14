import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'basicoAngular8';

  constructor(
    public wsService: WebsocketService,
    // Inicializamos la propiedad chatService del mismo tipo importandolo en el constructor,
    // public chatService: ChatService
    // Instanciamos el charService para escuchar mensajes privados
    public chatService: ChatService

  ) { }

  ngOnInit() {
    // aqui enviamos el mensaje cuando se inicia el componente
    // this.chatService.sendMessage('Hola desde angular');

    // Nos suscribimos a los mensajes privados
    this.chatService.getMessagePrivate().subscribe( msg => {
      console.log(msg);
    });

  }



}


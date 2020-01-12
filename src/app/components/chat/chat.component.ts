import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string;
  // creamos una propiedad del tipo suscription
  mensajesSubscription: Subscription;

  // creamos un contenedor para los mensajes
  mensajes: any[] = [];

  elemento: HTMLElement;


  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.texto = '';
    this.elemento = document.getElementById('chat-mensajes');

    // nos suscribimos al obserbable para obtener los mesajes desde el servidor
    this.mensajesSubscription = this.chatService.getMessage().subscribe(msg => {
      // console.log(msg);
      // insertamos el mensaje en el contenedor
      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });

  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }

  enviar() {

    // verificamos que no se envie ningun texto vacio sin contenido
    if (this.texto.trim().length === 0) {
      return;
    }

    // enviamos el texto al servidor
    this.chatService.sendMessage(this.texto.trim());

    // limpiamos la variable
    this.texto = '';
  }

}

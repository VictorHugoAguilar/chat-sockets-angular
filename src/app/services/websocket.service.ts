import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  private usuario: Usuario = null;

  constructor(
    private socket: Socket,
    private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }


  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;

      // recargamos el storage
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: any) {

    console.log('emit socket');

    // emit ('EVENTO', payload?, callback?)
    this.socket.emit(evento, payload, callback);

  }

  // crear un metodo que escucha cualquier evento que emita el servidor
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWs(nombre: string) {

    // console.log('Configurando', nombre);

    // Creamos una promesa como no es asincrono para decir que es ok o ko
    return new Promise((resolve, reject) => {

      this.emit('configurar-usuario', { nombre }, resp => {
        // console.log(resp);

        this.usuario = new Usuario(nombre);

        // Guardamos en el storage
        this.guardarStorage();

        // Si va todo bien devolvemos la promesa
        resolve();
      });

    });
  }

  // creamos el logout
  logoutWs() {

    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => { });

    this.router.navigateByUrl('/');
  }

  // obtener el usuario
  getUsuario() {
    return this.usuario;
  }

  // guardamos en la memoria del navegador en el local storage
  guardarStorage() {

    localStorage.setItem('usuario', JSON.stringify(this.usuario));

  }

  // cargamos en memoria si existe info en el local storage
  cargarStorage() {

    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

      // ahora si existe el usuario lo cargamos al loginWs
      this.loginWs(this.usuario.nombre);
    }

  }

}

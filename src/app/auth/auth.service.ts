import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginForm } from '../login/login-form.model';
import { Constantes } from '../utils/Constantes';
import { Observable } from 'rxjs';

//import para la navegacion
import { Router } from '@angular/router';
import { Response_user } from '../models/Response_user';
import { Response_error } from '../models/Response_error';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isLoggedIn: boolean = false; // Simulación de sesión activa
  datos: Response_user = { codigo:0, mensaje:'',  response:null};
  err: Response_error = {codigo: 0, mensaje:'', detalles:null}
  constructor(private http: HttpClient, private router: Router) {}

  validAuth(login: LoginForm) {
    const url = Constantes.API_JWT_URL;
    var data = { "usuario": login.username, "contrasenia": login.password }
    console.log(login.username + " | " + login.password);
    // const base64Credentials = btoa(login.username + ':' + login.password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //llamado al Post de spring security

    this.getData_User(url,data,{headers}).subscribe(
      (response)=>{
      this.datos = response;
      console.log(this.datos.codigo);
      console.log(this.datos.mensaje);
      console.log("dentro del elemento" + this.datos.response.usuario);
      this.isLoggedIn=true;
     },
    (error) =>{
      this.err = error.error;    
      console.log(this.err);
    }
    );
      
    return this.isLoggedIn;
  }

  getData_User(uri: any,data: any,header:any): Observable<any>{
    return this.http.post<any>(uri, data,header);    
  }


  getSession() {
    return localStorage.getItem("session");
  }
  logout() {
    this.isLoggedIn = false;
    return localStorage.setItem("session", this.isLoggedIn.toString());
    //return this.isLoggedIn;
  }

  isAuthenticated() {
    return localStorage.getItem("session");   
  }

  async _saveSession() {
    await localStorage.setItem("session", "true");
  }
}

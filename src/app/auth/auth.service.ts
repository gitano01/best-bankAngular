import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginForm } from '../login/login-form.model';
import { Constantes } from '../utils/Constantes';

//import para la navegacion
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isLoggedIn: boolean = false; // Simulación de sesión activa
  codigo:any;
  constructor(private http: HttpClient, private router: Router) { }

  validAuth(login: LoginForm) {
    const url = Constantes.API_JWT_URL;
    var data = { "usuario": login.username, "contrasenia": login.password }

    console.log(login.username + " | " + login.password);
    // const base64Credentials = btoa(login.username + ':' + login.password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //llamado al Post de spring security
   
    const userData = this.http.post<Response>(url, data, { headers })
      .subscribe(response  => {
       

        this.isLoggedIn = true;
        console.log(this.isLoggedIn);
        console.log("Respuesta del servidor ", response);
       
        
      });

      if (this.isLoggedIn === true) {
        this._saveSession();
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    return this.isLoggedIn;
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
    //return this.isLoggedIn;
  }

  async _saveSession() {
    await localStorage.setItem("session", "true");
  }
}

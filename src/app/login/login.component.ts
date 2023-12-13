import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Title}  from '@angular/platform-browser';


//import para la navegacion
import { Router} from '@angular/router';
import { LoginForm } from './login-form.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoggedIn = false;

  constructor(private fb: FormBuilder, private authService: AuthService,  private title: Title, private router: Router) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Aquí puedes realizar la lógica de autenticación
      const formData: LoginForm = this.loginForm.value as LoginForm;
      this.authService.validAuth(formData);
    }
  }

  ngOnInit(){
    if(this.authService.getSession() !== "true"){
      console.log(this.authService.getSession());
      this.router.navigate(['login']);
      }else{
        this.router.navigate(['home']);
      }
  }

  async _saveSession(){
    await localStorage.setItem("session","true");
  }

}

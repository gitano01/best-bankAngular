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
  errorMessage: string='';

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
      if(this.authService.validAuth(formData) == false){
        this.errorMessage='El username y/o contraseña esta incorrecto';
        setTimeout(()=>{
          this.errorMessage='';          
          this.loginForm.reset();
        }, 3000);
        
      }else{
        this._saveSession();
        this.router.navigate(['home']);
      }
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

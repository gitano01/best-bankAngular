import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title}  from '@angular/platform-browser';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{

  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private title: Title) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
      if (this.signupForm.valid) {
        // Aquí puedes realizar la lógica de autenticación
      }
  }

  ngOnInit(){
    this.title.setTitle('Signup');
  }

}

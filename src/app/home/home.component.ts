import { Component} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  title='Home';


  constructor(private authService: AuthService, private router: Router) {
    if(this.authService.getSession() !== "true"){
      console.log(this.authService.getSession());
        this.router.navigate(['login']);
      }

  }

 /*  OnInit(){
    console.log(this.authService.getSession());
      if(this.authService.getSession()?.toString() !== "true"){
        this.router.navigate(['login']);
      }
  } */


}

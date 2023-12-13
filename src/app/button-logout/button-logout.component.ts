import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
    //import para la navegacion
    import { Router} from '@angular/router';
@Component({
  selector: 'app-button-logout',
  templateUrl: './button-logout.component.html',
  styleUrls: ['./button-logout.component.css']
})

export class ButtonLogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

   }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

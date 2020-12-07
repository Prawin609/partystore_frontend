import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../authenticate.service';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService,AuthenticateService]
})
export class LoginComponent implements OnInit {

  public ismyTextFieldType: boolean;
  public eye: string;
  invalidLogin: boolean;
  user: User;
  public users: User[];
 
  constructor(private authenticateService: AuthenticateService, private route: Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.eye = 'fas fa-eye-slash';
  }

  eyeOpen() {
    this.ismyTextFieldType = true;
    this.eye = 'fa fa-eye';
  }

  eyeClose() {
    this.ismyTextFieldType= false;
    this.eye= 'fas fa-eye-slash';
  }

  handleLogin(){
    if(this.authenticateService.authenticate(this.user.email, this.user.password)){
      console.log("login verifieddd");
      this.route.navigate(["inventory"]);
      this.invalidLogin = false;
    }else{
      console.log("login not verified");
      this.invalidLogin = true;
    }
  }

  // handleJWTAuthLogin(){
  //   this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
  //         .subscribe(
  //           data => {
  //             console.log(data);
  //             this.router.navigate(["welcome", this.username]);
  //             this.invalidLogin = false;
  //           },
  //           error => {
  //             console.log(error);
  //             this.invalidLogin = true;
  //           }
            
  //         )
  // }

}

import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  email: string;
 
  constructor(private userService: UserService, private authenticateService: AuthenticateService, private route: Router,
    private routerAct: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = new User();
    this.eye = 'fas fa-eye-slash';

    // this.user.email = "Prawinnnnnnnn";
    // console.log(this.user.email);
  }

  loginUser(user){


    console.log(user)
    this.authenticateService.attemptLogin(user.email, user.password)
    .subscribe( res => {
      console.log(res)
    },
    err => console.log(err))
  }

  eyeOpen() {
    this.ismyTextFieldType = true;
    this.eye = 'fa fa-eye';
  }

  eyeClose() {
    this.ismyTextFieldType= false;
    this.eye= 'fas fa-eye-slash';
  }

  getUserinEmail(email: string){
    this.userService.getUserbasedOnEmail(email)
      .subscribe(res => {
        this.user = res;
      },
      err => console.log(err));
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

  handleJWTAuthLogin(user: User){
    console.log(user.email);
    console.log(user.password);
    this.authenticateService.executeJWTAuthenticationService(user.email, user.password)
          .subscribe(
            data => {
              console.log(data);
              this.route.navigate(["inventory"]);
              this.invalidLogin = false;
            },
            error => {
              console.log(error);
              this.invalidLogin = true;
            }
          )
  }
}

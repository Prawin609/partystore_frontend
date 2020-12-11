import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  showErrorMessage: boolean;



  newUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.newUser = new User();
  }

  createNewUser(user : User){
    user.role = "User";
    this.userService.createNewUser(user)
      .subscribe(
        res => {
          console.log(res);
          this.showSuccessMessage = true;
          this.newUser.firstName="",
          this.newUser.lastName="",
          this.newUser.email="",
          this.newUser.role="",
          this.newUser.password=""
          setTimeout(() => this.showSuccessMessage=false, 1500);
        },
        err => {
          console.log("Error Response : ", err)
            this.showErrorMessage = true;
            this.newUser.firstName="",
            this.newUser.lastName="",
            this.newUser.email="",
            this.newUser.role="",
            this.newUser.password=""
            this.serverErrorMessages = 'Something went wrong, Please contact admin';
            setTimeout(()=>this.showErrorMessage=false, 3000);
            
        }
      );
  }


}

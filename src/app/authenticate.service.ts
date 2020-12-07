import { Injectable } from '@angular/core';
import { User } from './model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  users: User[]
  loginFlag: boolean = false;

  constructor(private userService: UserService) {
    this.getAllusers();
   }

  getAllusers(){
    this.userService.getAllusers()
      .subscribe(res => {
        this.users = res;
        console.log(this.users);
      },
      err => console.log("err in authenticated service get all users : ", err));
  }

  authenticate(email, password){
    // this.getAllusers();
    // setTimeout(() => {
      this.users.every((data)=> {
        console.log(data);
        console.log("email : ", data.email);
        console.log("password : ", data.password);
        if((data.email === email) && data.password === password.trim()){
          sessionStorage.setItem("authenticatedUser", email);
          this.loginFlag =  true;
          console.log("login success");
          return;
        }else{
          console.log("inside else false");
          this.loginFlag=false;
        }
      })
    // }, 200);
    return this.loginFlag;
}

public isUserLoggedIn() {
  let user = sessionStorage.getItem("authenticatedUser");
  return !(user === null);
}

public logout(){
  sessionStorage.removeItem("authenticatedUser");
}

}

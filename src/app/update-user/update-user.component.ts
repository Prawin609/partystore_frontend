import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  newUser: User;
  message: string;
  id: string;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  showErrorMessage: boolean;

  constructor(private userService: UserService, private authUser: AuthenticateService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.newUser = new User();
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);

    // this.userService.getSingleUser(this.id)
    //   .subscribe(res => this.newUser = res,
    //     err => console.log(err))

    this.userService.getUserbasedOnEmail(this.id)
      .subscribe(res => this.newUser = res,
        err => console.log(err))

    }

    updateUser(user: User){
      user.role = "User"
      //console.log("User id from the update compo :  ",user._id);
      this.userService.updateUser(user._id, user)
      .subscribe(res => {
        console.log(res);
        this.authUser.getAllusers();
        setTimeout(() => {
          this.router.navigate(["userdetails"]);
        }, 500)
        
      },
      err => console.log(err))
  }

}

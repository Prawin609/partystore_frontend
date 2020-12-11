import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  user: User;
  message: string;
  

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
    console.log("from session storage" ,sessionStorage.getItem("authenticatedUser"));
    console.log("from session storage" ,sessionStorage.authenticatedUser);
    //this.user.email = sessionStorage.authenticatedUser;
    this.getSingleUser(sessionStorage.authenticatedUser);
  }

  getSingleUser(email: string){
    this.userService.getUserbasedOnEmail(email).subscribe(
      r => {this.user = r; console.log("user on email : ", this.user)},
      err => console.log(err)
    )
  }

  deleteUser(id){
    if(confirm("Are you sure to delete "+this.user.firstName+ " "+this.user.lastName)) {
      console.log("Implement delete functionality here");
      this.userService.deleteUser(id)
      .subscribe(res => {
        console.log(res);
        this.message= "User Details deleted Successfully";
        this.router.navigate(["logout"]);
      },
      err => {
        console.log(err);
      })
    }
    
  }

}

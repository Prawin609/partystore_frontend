import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { withLatestFrom } from 'rxjs/operators';;
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  p: number = 1;
  user: User;
  users: User[];
  counter: number;

  // filteredData$: Observable<User[]>;

  // formGroup: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.getAllUSers();
    
  }

  getAllUSers(){
    this.userService.getAllusers()
      .subscribe(res => {
        this.users = res;
        console.log(this.users);
      })
  }


  deleteUser(id){
    // console.log(id);
    this.userService.deleteUser(id)
      .subscribe(res => {
        console.log(res);
        this.getAllUSers();
      },
      err => {
        console.log(err);
      })
  }
}

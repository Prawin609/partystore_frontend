import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  urlPath= "https://cors-anywhere.herokuapp.com/peaceful-mountain-14416.herokuapp.com/api/";
  tempUrl="http://localhost:3000/api/"

  constructor(private http: HttpClient) { }

  createNewUser(user: User){
    return this.http.post(this.tempUrl+"/users", user);
  }

  getAllusers(){
    return this.http.get<User []>(this.tempUrl+"users");
  }

  deleteUser(id: string){
    console.log(this.urlPath+"users/"+id);
    return this.http.delete(this.tempUrl+"users/"+id);
  }

  updateUser(id: string, user: User){
    return this.http.put(this.tempUrl+"users/"+id,user);
  }

  getSingleUser(id: string){
    return this.http.get<User>(this.tempUrl+"users/"+id);
  }
}

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  t = sessionStorage.getItem('token');
  

  urlPath= "https://cors-anywhere.herokuapp.com/party-store-api.herokuapp.com/api/";
  tempUrl="http://localhost:3000/api/";
  emailUrl="https://cors-anywhere.herokuapp.com/peaceful-mountain-14416.herokuapp.com/api/email/";


  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.t);

  
        // headers_object.append('Content-Type', 'application/json');
        // headers_object.append("Authorization", "Bearer " + t);

        httpOptions = {
          headers: this.headers_object
        };


  constructor(private http: HttpClient) { }

  createNewUser(user: User){
    return this.http.post(this.urlPath+"/users", user);
  }


  getAllusers(){
    return this.http.get<User []>(this.urlPath+"users",this.httpOptions);
  }

  deleteUser(id: string){

    console.log(this.urlPath+"users/"+id);
    return this.http.delete(this.urlPath+"users/"+id);
  }

  updateUser(id: string, user: User){
    return this.http.put(this.urlPath+"users/"+id,user);
  }

  getUserbasedOnEmail(email: string){
    return this.http.get<User>(this.emailUrl+"/"+email);
  }

  getSingleUser(id: string){
    return this.http.get<User>(this.urlPath+"users/"+id);
  }
}

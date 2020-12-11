import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  t = sessionStorage.getItem('token');


  urlPath = "https://cors-anywhere.herokuapp.com/party-store-api.herokuapp.com/api/";
  tempUrl = "http://localhost:3000/api/";
  emailUrl = "https://cors-anywhere.herokuapp.com/party-store-api.herokuapp.com/api/users/email/";
  signupUrl = "https://cors-anywhere.herokuapp.com/party-store-api.herokuapp.com/signup/user";


  // headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.t);
  headers_object = new HttpHeaders().set("Authorization",  this.t);


  // headers_object.append('Content-Type', 'application/json');
  // headers_object.append("Authorization", "Bearer " + t);

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient) { }

  createNewUser(user: User) {
    console.log("url from the service : ", this.signupUrl);
    return this.http.post(this.signupUrl, user);
  }


  getAllusers() {
    return this.http.get<User[]>(this.urlPath + "users", this.httpOptions);
  }

  deleteUser(id: string) {

    console.log(this.urlPath + "users/" + id);
    return this.http.delete(this.urlPath + "users/" + id);
  }

  updateUser(id: string, user: User) {
    console.log("User in user service : ", user);
    console.log(id);
    console.log(this.urlPath + "users/" + id)
    console.log(this.httpOptions)
   return this.http.put(this.urlPath + "users/" + id, user, this.httpOptions);
  }

  getUserbasedOnEmail(email: string) {
    return this.http.get<User>(this.emailUrl + email, this.httpOptions);
  }

  getSingleUser(id: string) {
    return this.http.get<User>(this.urlPath + "users/" + id, this.httpOptions);
  }
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from './model/user'
import { map } from 'rxjs/operators'
import { UserService } from './user.service'

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
 // urlPath = 'https://cors-anywhere.herokuapp.com/party-store-api.herokuapp.com'
  tempUrl = 'https://peaceful-mountain-14416.herokuapp.com/api/'
  urlPath = 'https://cors-anywhere.herokuapp.com/party-store-api.herokuapp.com'

  users: User[]
  loginFlag: boolean = false

  constructor(private userService: UserService, private http: HttpClient) {
    // this.getAllusers();
      //server, exclusion
      //client side, Angular 







  }

  attemptLogin(email: String, password: String) {
    //  const url = "https://cors-anywhere.herokuapp.com/party-store-api.herokuapp.com/login/user";
    const url = 'https://cors-anywhere.herokuapp.com/party-store-api.herokuapp.com/login/user'

    return this.http.post(url, { email: email, password: password })
  }

  getAllusers() {
    this.userService.getAllusers().subscribe(
      (res) => {
        this.users = res
        console.log(this.users)
      },
      (err) =>
        console.log('err in authenticated service get all users : ', err),
    )
  }

  public getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  public getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) return sessionStorage.getItem(TOKEN)
  }

  authenticate(email, password) {
    // this.getAllusers();
    // setTimeout(() => {
    this.users.every((data) => {
      console.log(data)
      console.log('email : ', data.email)
      console.log('password : ', data.password)
      if (data.email === email && data.password === password.trim()) {
        sessionStorage.setItem('authenticatedUser', email)
        this.loginFlag = true
        console.log('login success')
        return
      } else {
        console.log('inside else false')
        this.loginFlag = false
      }
    })
    // }, 200);
    return this.loginFlag
  }

  public executeJWTAuthenticationService(username, password) {
    // console.log('user : ', username)
    // console.log('password : ', password)
    // console.log(`${this.urlPath}/login/user`)

    return this.http
      .post<any>(`${this.urlPath}/login/user`, {
        email: username,
        password: password,
      })
      .pipe(
        map((data) => {
          console.log("after login")
          //console.log(data)
          sessionStorage.setItem(AUTHENTICATED_USER, username)
          sessionStorage.setItem(TOKEN, `Bearer ${data['x-access-token']}`)
          sessionStorage.setItem("userId", data['user']["_id"])
          sessionStorage.setItem("username", data.user.firstName)
         // console.log(data)
          return data
        }),
      )
  }

  public isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  public logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}

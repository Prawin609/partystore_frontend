import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Inventory } from './model/inventory'
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventoryAPIUrl = environment.devAPIUrl + environment.devInventoryRoute
  reviewAPIUrl = environment.devAPIUrl + environment.devInventoryRoute + environment.devReviewRoute

  t = sessionStorage.getItem('token')
  headers_object = new HttpHeaders().set('Authorization', this.t)

  httpOptions = {
    headers: this.headers_object,
  }
  constructor(private http: HttpClient) {}

  getInventories() {
    return this.http.get<Inventory[]>(this.inventoryAPIUrl, this.httpOptions)
  }

  getInventory(inventoryId) {
    return this.http.get<Inventory>(this.inventoryAPIUrl + inventoryId, this.httpOptions)
  }

  addReview(postData,inventoryId, userId){

    console.log(this.reviewAPIUrl + inventoryId)
    return this.http.post<Inventory>(this.reviewAPIUrl + inventoryId, postData, this.httpOptions);

  }
}

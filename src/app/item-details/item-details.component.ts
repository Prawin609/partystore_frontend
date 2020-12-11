import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { InventoryService } from '../inventory.service'
import { Inventory } from '../model/inventory'

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  qtn = 0
  invntoryId
  inventory: Inventory
  reviews = []
  reviewDescription = ''
  userId = sessionStorage.getItem('userId')
  username = sessionStorage.getItem('username')

  constructor(
    private activeRoutes: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
  ) {}

  ngOnInit(): void {
    this.invntoryId = this.activeRoutes.snapshot.params['inventoryId']
    this.getInvetoryById()
  }

  updateQtn(operation) {
    if (operation == 'i') this.qtn++
    else if (operation == 'd') this.qtn--
  }

  checkUserId(id) {
    if (this.userId == id) return true
    else return false
  }

  getInvetoryById() {
    this.inventoryService.getInventory(this.invntoryId).subscribe(
      (res) => {
        this.inventory = res as Inventory
        this.reviews = this.inventory.reviews
      },
      (error) => console.log(error),
    )
  }

  onaddReview(description) {
    let postData = {
      userId: this.userId,
      description: description,
      image:
        'data:image/jpeg;base64,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',
    }

    this.inventoryService
      .addReview(postData, this.inventory._id, this.userId)
      .subscribe(
        (res) => {
          window.location.reload()
          //this.router.navigate(["/item-details/" + this.inventory._id])
        },
        (error) => {
          console.log(error)
          this.reviewDescription = ''
        },
      )
  }
}

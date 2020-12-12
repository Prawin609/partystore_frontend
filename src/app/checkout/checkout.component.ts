import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { InventoryService } from '../inventory.service'
import { Inventory } from '../model/inventory'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  inventoryId
  qtn
  inventory: Inventory
  constructor(
    private activeRoutes: ActivatedRoute,
    private inventoryService: InventoryService,
  ) {}

  ngOnInit(): void {
    this.inventoryId = this.activeRoutes.snapshot.params['invetoryId']
    this.qtn = this.activeRoutes.snapshot.params['qtn']
    this.inventory = new Inventory()
    this.getInvetoryById()
  }

  getInvetoryById() {
    this.inventoryService.getInventory(this.inventoryId).subscribe(
      (res) => {
        this.inventory = res as Inventory;
        console.log(this.inventory)
      },
      (error) => console.log(error),
    )
  }
}

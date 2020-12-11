import { Component, OnInit } from '@angular/core'
import { InventoryService } from '../inventory.service'
import { Inventory } from '../model/inventory'

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit {
  inventories: Inventory[]
  updatedInventories: Inventory[]
  categories: string[]

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getInventories().subscribe(
     async (res) => {
        this.inventories = res
        this.updatedInventories = res
        this.categories = []

        this.categories = this.getUniqueCategories(res)
        // for (let i = 0; i < res.length; i++) {
        //   if (this.categories.indexOf(res[i].category) < 0)
        //     this.categories.push(res[i].category)
        // }

        console.log(this.categories)
      },
      (err) => {
        alert('Error!!, try again.')
      },
    )
  }

  updateInvetoryList(category: string) {
    this.updatedInventories = []

    if (category == 'all') {
      for (let i = 0; i < this.inventories.length; i++) {
        this.updatedInventories.push(this.inventories[i])
      }
      return;
    }

    for (let i = 0; i < this.inventories.length; i++) {
      if (this.inventories[i].category === category)
        this.updatedInventories.push(this.inventories[i])
    }
  }

  getUniqueCategories(source) {
    let uniqueCategories = []
    for (let i = 0; i < source.length; i++) {
      if (uniqueCategories.indexOf(source[i].category) < 0)
        uniqueCategories.push(source[i].category)
    }

    return uniqueCategories
  }
}

import { Review } from './review'

export class Inventory {
  _id: string
  name: string
  category: string
  imageUrl: string
  type: string
  isAvailable: string
  description:string
  quantity: Number
  reviews: [Review]
}

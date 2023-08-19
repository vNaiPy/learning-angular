export interface Product {
  id?: number,
  name: string,
  description: string,
  price: number,
  imgUrl?: string,
  status?: {
    name: string
  },
  store?: {
    name: string
  },
  categories?: {
    id?: number,
    name: string
  }
}

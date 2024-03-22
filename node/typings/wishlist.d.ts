export interface Wishlist {
  id: string
  email: string
  wishlistType: string
  products: Productos[]
  isPublic: boolean
  fieldsConfig?: FieldsConfig
}

export interface FieldsConfig {
  department: string
  description: string
}

export interface Productos {
  ID: number
  Image: string
  unitValue: number
  linkProduct: string
  nameProduct: string
  quantityProduct: number
  skuCodeReference: string
  department: string
  bundle: number
}

export interface WishlistUpdateArs extends Wishlist {
  id: string
  wishlist: Wishlist
}

export type WishlistInput = {
  wishlist: Wishlist
}

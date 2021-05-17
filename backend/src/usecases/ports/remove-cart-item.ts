export interface RemoveCartItem {
  remove: (cartId: string, productId: string) => Promise<void>
}

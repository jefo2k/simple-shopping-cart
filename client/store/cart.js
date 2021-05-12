export const state = () => ({
  items: []
})

export const mutations = {
  add(state, item) {
    const productAlreadyInCart = state.items.find(i => i.productId === item.productId)

    if (!productAlreadyInCart) {
      state.items.push(item)
    } else {
      productAlreadyInCart.quantity++
    }
  }
}
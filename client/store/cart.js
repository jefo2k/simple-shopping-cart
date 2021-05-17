export const state = () => ({
  cart: {
    id: undefined,
    items: []
  }
})

export const mutations = {
  add(state, cart) {
    state.cart = cart
  }
}

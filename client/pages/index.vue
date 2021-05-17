<template>
  <div class="content">
    <div>
      <h1 class="title">
        Products
      </h1>
      <div class="products">
        <a-empty v-if="!productList.length">
          <span slot="description">
            Sorry! There is no available products in this store! 
            <a-icon type="frown" theme="twoTone" />
          </span>
        </a-empty>
        <a-card hoverable class="product" v-for="product in productList" :key="product.productId">
          <img
            slot="cover"
            :alt="product.name"
            :src="product.thumbUrl"
          />
          <template slot="actions" class="ant-card-actions">
            <a-badge :count="getSelectedQuantity(product.productId)" :style="{ zIndex: 0 }">
              <a-button type="primary" icon="plus-circle" size="large" style="width: 125px;" @click="addToCart(product.productId, 1)">
                Add
              </a-button>
            </a-badge>
            <a-popconfirm 
              title="All product items will be removed from the cart. Are you sure?!?"
              :disabled="!getSelectedQuantity(product.productId)"
              @confirm="removeFromCart(product.productId)"
              >
              <a-button type="primary" icon="minus-circle" size="large" style="width: 125px;" :disabled="!getSelectedQuantity(product.productId)">
                Remove
              </a-button>
              <a-icon slot="icon" type="warning" style="color: red" />
            </a-popconfirm>
          </template>
          <a-card-meta :title="product.name" :description="product.description" />
        </a-card>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  async asyncData ({ $axios }) {
    const response = await $axios.get('/products')
    const productList = response.data.items

    return {
      productList
    }
  },
  data () {
    return {
      cartId: undefined
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart
    }
  },
  methods: {
    async addToCart(productId, quantity) {
      const params = {
        cartId: (this.cart ? this.cart.id : undefined),
        productId,
        quantity
      }
      const response = await this.$axios.post('/cart', params)
      const cart = response.data.cart
      this.$store.commit('cart/add', cart)
      localStorage.setItem('cartId', JSON.stringify(cart.id))
    },
    async removeFromCart(productId) {
      if (this.cartId) {
        const response = await this.$axios.delete(`/cart/${this.cartId}/product/${productId}`)
        const cart = response.data.cart
        this.$store.commit('cart/add', cart)
        localStorage.setItem('cartId', JSON.stringify(cart.id))
      }
    },
    async fetchCart() {
      if (this.cartId) {
        const response = await this.$axios.get(`/cart/${this.cartId}`)
        const cart = response.data.cart
        this.$store.commit('cart/add', cart)
      }
    },
    getSelectedQuantity(productId) {
      const cart = this.$store.state.cart.cart
      return cart.items.reduce((acc, i) => {
        return i.productId === productId ? acc + i.quantity : acc
      }, 0)
    }
  },
  mounted() {
    this.cartId = JSON.parse(localStorage.getItem('cartId')) || undefined
    if (this.cartId) {
      this.fetchCart()
    }
  }
}
</script>

<style>
.content {
  margin: 0 auto;
  /* min-height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #35495e;
  letter-spacing: 1px;
  padding-top: 25px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 50px;
}

.product {
  margin: 10px;
  max-width: 300px;
}
</style>

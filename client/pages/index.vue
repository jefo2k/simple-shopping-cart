<template>
  <div class="content">
    <div>
      <h1 class="title">
        Products
      </h1>
      <div class="products">
        <a-card hoverable class="product" v-for="product in productList" :key="product.id">
          <img
            slot="cover"
            :alt="product.name"
            :src="product.thumbUrl"
          />
          <template slot="actions" class="ant-card-actions">
            <a-button type="primary" icon="plus-circle" size="large" style="width: 275px;" @click="addToCart(product.id, 1)">
              Add to cart
            </a-button>
            <!-- <a-icon type="shopping-cart" :style="{ fontSize: '22px' }" />
            <a-icon type="plus-circle" /> -->
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
    }
  },
  computed: {
    shoppingCart() {
      return this.$store.state.cart.items
    }
  },
  methods: {
    addToCart(productId, quantity) {
      this.$store.commit('cart/add', { productId, quantity })
    },
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
}

.product {
  margin: 10px;
  max-width: 300px;
}
</style>

<template>
  <div class="header">
    <div>
      <span class="header-title">Simple Shopping Cart</span>
      <a-tag color="blue">
        beta
      </a-tag>
    </div>
    <div>
      <a-badge :count="itemsQuantity">
        <a href="#">
          <a-icon type="shopping-cart" :style="{ fontSize: '20px' }" />
        </a>
      </a-badge>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    itemsQuantity() {
      const cart = this.$store.state.cart.cart
      return cart.items.reduce((acc, i) => acc + i.quantity, 0)
    }
  }
}
</script>

<style>
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  background: #D2EAFF;
  color: rgba(0, 0, 0, 0.65);
}
.header-title {
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

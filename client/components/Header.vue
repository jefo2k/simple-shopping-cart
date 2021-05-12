<template>
  <a-page-header
    title="Simple Shopping Cart App"
    tag="beta"
    class="header"
  >
    <template slot="tags">
      <a-tag color="blue">
        Beta
      </a-tag>
    </template>
    <template slot="extra">
        <!-- 
          <a-button>
          Sign in
        </a-button> 
        -->
      <a-badge :count="itemsQuantity" :offset="[-17,11]" style="width: 46px;">
        <a href="#">
          <a-icon type="shopping-cart" :style="{ fontSize: '22px' }" />
        </a>
      </a-badge>
    </template>
  </a-page-header>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    itemsQuantity() {
      return this.$store.state.cart.items.reduce((acc, i) => acc + i.quantity, 0)
    }
  }
}
</script>

<style>
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  background: #D2EAFF;
  color: rgba(0, 0, 0, 0.65);
}
</style>

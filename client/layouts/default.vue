<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', background: '#D2EAFF', height: '65px' }">
      <Header/>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0px 50px', marginTop: '65px' }">
      <Nuxt />
    </a-layout-content>
    <a-layout-footer>
      <Footer/>
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data () {
    return {
      currentYear: (new Date()).getFullYear()
    }
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

tr:last-child td {
  padding-bottom: 0;
}

.ant-layout {
  background: #f9f9f9;
}

</style>

<template>
  <div>
    <hr>
    <small class="footer">&copy; Copyright {{ currentYear }}, Jefoland Corp. All Rights Reserved.</small>
  </div>
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
.footer {
  color: rgba(0, 0, 0, 0.65);
}
</style>

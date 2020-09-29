<template>
  <div>
    <ProductListOne />
    <ProductListTwo />
    <button @click="increment">增加</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProductListOne from '@components/ProductListOne';
import ProductListTwo from '@components/ProductListTwo';

export default {
  components: {
    ProductListOne,
    ProductListTwo
  },
  methods: {
    ...mapActions(['increment'])
  },
  data () {
    return {}
  }
}
</script>

<style>
body{
  font-family: Ubuntu;
  color: #555;
}
</style>
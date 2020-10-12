<template>
  <ul class="box">
    <li  
      v-for="(item, idx) in data"
      :key="idx">
      <i class="pot"
        :class="item.isCheck === 1 ? 'active' : ''" 
        @click="check(item)">
      </i>
      <span class="context">{{ item.context }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ShuttleSelectionBox',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {},
  methods: {
    check(item) {
      item.isCheck =  item.isCheck === 0 ? 1 : 0;
    }
  }
}
</script>


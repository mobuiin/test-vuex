<template>
  <div>
    <ul 
      v-for="(item, idx) in filterList" 
      :key="idx" 
      :class="item.isCheck === 1 ? 'checked' : ''" 
    >
      <li >
        <i class="pot" 
          :class="item.isCheck === 1 ? 'active' : ''" 
          @click="check(item)">
        </i> 
        <span class="context"> {{ item.context }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    isCheck: {
      type: Number,
      default: 0
    }
  },
  computed: {
    filterList() {
      return this.data.filter(item => item.isCheck === this.isCheck)
    }
  },
  methods: {
    check(item) {
      item.isCheck =  item.isCheck === 0 ? 1 : 0;
    }
  }
  
}
</script>


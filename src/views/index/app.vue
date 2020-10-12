<template>
  <div>
    <ul>
      <li @click="open('vuex.html')">test vuex</li>
      <li @click="open('one.html')">第一套面试题 todolist 与 穿梭框</li>
    </ul>
  </div>
</template>

<script>

export default {
  methods: {
    open(url) {
      location.href = url;
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
ul > li {
  padding-bottom: 15px;
  color: #5d5ded;
  text-decoration: underline;
  cursor:pointer
}
</style>
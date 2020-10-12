<template>
  <div id="app">
    <div class="check-main">
      <button @click="addCheck">add</button>
      <TodoList :data="listCheck"></TodoList>

      <h3 >已完成</h3>
      <TodoList :data="listCheck" :isCheck=1></TodoList>
    </div>

    <div class="box-main">
      <h3>双栏穿梭选择框</h3>
      <div class="box-content">
        <ShuttleSelectionBox  :data="filterCheck" />
        <div>
          <button @click="add">&gt;</button>
          <button @click="remove">&lt;</button>
        </div>
        <ShuttleSelectionBox :data="filterMove" />
      </div>
    </div>
   </div>
</template>


<script>
import TodoList from '@components/TodoList';
import ShuttleSelectionBox from '@components/ShuttleSelectionBox';

export default {
  name: 'App',
  components: {
    TodoList,
    ShuttleSelectionBox
  },
  data() {
    return {
    listCheck: [
      {
        isCheck: 0,
        context: '吃饭'
      },
      {
        isCheck: 1,
        context: '睡觉'
      },
      {
        isCheck: 0,
        context: '打豆豆'
      }
    ],
    listSelect: [
      {
        isCheck: 0,
        context: '吃饭',
        isMove: 0
      },
      {
        isCheck: 1,
        context: '睡觉',
        isMove: 0
      },
      {
        isCheck: 0,
        context: '打豆豆',
        isMove: 0
      },
      {
        isCheck: 1,
        context: 'context1',
        isMove: 0
      },
      {
        isCheck: 0,
        context: 'context2',
        isMove: 0
      },
      {
        isCheck: 0,
        context: 'context3',
        isMove: 0
      }
    ]
    }
  },
  computed: {
    filterCheck() {
      return this.listSelect.filter(item => item.isMove === 0)
    },
    filterMove() {
      return this.listSelect.filter(item => item.isMove === 1)
    }
  },
  methods: {
    check(item) {
      item.isCheck =  item.isCheck === 0 ? 1 : 0;
    },
    addCheck() {
      const context =prompt('请输入内容', '');
      if(context) {
        this.listCheck.push({
          isCheck: 0,
          context
        })
      }
    },
    add() {
      const array = this.listSelect.filter(item => item.isCheck === 1);
      array.forEach(item => item.isMove = 1);
    },
    remove() {
      const array = this.listSelect.filter(item => item.isCheck === 1);
      array.forEach(item => item.isMove = 0);
    }
  }
}
</script>

<style coped>
.box-main {
  border-top: 2px dashed #999;
  margin-top: 100px;
}
.box-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 45%;
  min-height: 300px;
  margin-right: 20px;
  border: 1px solid black;
}
ul > li {
  display: flex;
  list-style-type: none;
  justify-content: left;
  align-items: center;
}
.checked {
  color: #999;
  text-decoration: line-through;
}
.pot {
  width: 10px;
  height: 10px;
  border: 1px solid #999;
  border-radius: 50%;
}
.pot.active {
  background-color: red;
}
.context {
  padding-left: 10px;
}
</style>

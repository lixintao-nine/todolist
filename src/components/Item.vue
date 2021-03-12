<template>
  <li>
    <label :for="todo.title">
      <input type="checkbox" value="li-content" v-model="todo.isCompleted" />
      <span>{{ todo.title }}</span>
    </label>
    <button @click="isDelete">删除</button>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      requied: true,
    },
  },
  setup(props) {
    const isDelete = () => {
      console.log(props.todo.isCompleted);

      if (window.confirm("删除任务？")) {
        props.deleteTodo(props.index);
      }
    };
    return {
      isDelete,
    };
  },
});
</script>

<style scoped>
.item-list ul li {
  display: flex;
  align-items: center;
  list-style: none;
  height: 30px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.item-list ul li:last-child {
  border-bottom: 0px solid #ccc;
}
.item-list ul li label {
  width: 90%;
}
.item-list ul li span {
  display: inline-block;
  font-size: 20px;
  width: 90%;
  padding-left: 5px;
  word-break: break-all;
}
.item-list ul li:hover {
  background-color: #ccc;
  color: #fff;
}
.item-list ul li button {
  display: none;
  color: #fff;
  background-color: #999;
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
.item-list ul li button:hover {
  color: #ccc;
  background-color: #fff;
}
.item-list ul li:hover button {
  display: inline-block;
}
</style>
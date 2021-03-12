<template>
  <div class="footer">
    <input
      type="checkbox"
      value="li-content"
      v-model="allFlag"
      @click="changeFlag(!allFlag)"
    />
    <span> 已完成 {{ finished }} / 全部 {{ todos.length }}</span>
    <button @click="clearFinished">清除完成任务</button>
    <button @click="clear">清除全部任务</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "Footer",
  props: {
    clearAll: {
      type: Function,
      required: true,
    },
    todos: {
      type: Array,
      required: true,
    },
    changeFlag: {
      type: Function,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const clear = () => {
      if (window.confirm("删除所有任务？")) {
        props.clearAll();
      }
    };
    // 完成的数目
    const finished = computed(() => {
      let n = 0;
      //   这里报错是因为类型没有定义，这里要定义any就可以
      props.todos.forEach((todo: any) => {
        n += todo.isCompleted ? 1 : 0;
      });
      return n;
    });

    // 这一部分写的有点丑陋，有空可以改一下
    const allFlag = ref(false);
    let flagClear = true;
    const clearFinished = () => {
      if (finished.value == 0) {
        flagClear = true;
        return;
      }
      if (flagClear == true) {
        window.confirm("删除所有任务？");
        flagClear = false;
      }
      props.todos.forEach((todo: any, index) => {
        if (todo.isCompleted) {
          props.deleteTodo(index);
          clearFinished();
        }
      });
    };

    return {
      clear,
      finished,
      allFlag,
      clearFinished,
    };
  },
});
</script>

<style scoped>
.footer {
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px #ccc solid;
  padding: 10px;
  width: 90%;
  display: inherit;
  justify-content: space-between;
  align-items: center;
}
.footer span {
  width: 60%;
}
button {
  color: #fff;
  background-color: #999;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
button:hover {
  background-color: #ccc;
}
</style>
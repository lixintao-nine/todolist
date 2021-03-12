<template>
  <div class="header">
    <input
      type="text"
      placeholder="在此输入项目内容,并回车创建"
      v-model="newTitle"
      @keyup.enter="add()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Header",
  props: {
    // 这里传递了一个函数，如此表示。require表示必须传递内容
    addItem: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const newTitle = ref("");
    const add = () => {
      //   这里是回车事件，先判断数据是否为空，然后传递数据
      const test = newTitle.value;
      if (!test.trim()) {
        return;
      } else {
        //   不能直接调用addItem，可以在setup中传入props参数
        props.addItem(test);
        newTitle.value = "";
      }
    };
    return {
      newTitle,
      add,
    };
  },
});
</script>

<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 90%;
  display: inherit;
  justify-content: center;
  flex-direction: column;
}
.header input {
  outline: none;
  padding: 10px;
  border-radius: 5px;
  border: 1px #ccc solid;
  color: #ccc;
}
.header input:hover {
  box-shadow: 0 0 5px 3px #ccc;
}
</style>
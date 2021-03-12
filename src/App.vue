<template>
  <main>
    <h2>TO DO LIST</h2>
    <div class="container">
      <Header :addItem="addItem" />
      <List :todos="state.todos" :deleteTodo="deleteTodo" />
      <Footer
        :clearAll="clearAll"
        :todos="state.todos"
        :changeFlag="changeFlag"
        :deleteTodo="deleteTodo"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from "vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { saveTodos, readTodos } from "./utils/localStrorageUtils";

// 定义一个接口来约束state类型，保证数据有效？
interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}
export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
    List,
  },
  setup() {
    // 定义数据，用数组表示，每个项目为一个对象（包含了id、title、isCompleted）
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });
    // 加载后读取数据;
    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos();
      }, 1000);
    });

    // 通过函数调用子级数据，添加任务
    const addItem = (title: string) => {
      state.todos.unshift({
        id: state.todos.length,
        title: title,
        isCompleted: false,
      });
    };
    // 清除全部任务
    const clearAll = () => {
      state.todos = [];
    };
    // 删除一条数据
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };

    const changeFlag = (flag: boolean) => {
      state.todos.forEach((todo: any) => {
        todo.isCompleted = flag;
      });
    };

    // 监视操作，todos数据变化了直接存在浏览器的缓存中
    // watch(
    //   () => state.todos,
    //   (value) => {
    //     // 存在浏览器的缓存中
    //     localStorage.setItem("today_key", JSON.stringify(value));
    //   },
    //   { deep: true }
    // );

    // 这个写法需要理解一下
    watch(() => state.todos, saveTodos, { deep: true });

    return {
      state,
      addItem,
      clearAll,
      deleteTodo,
      changeFlag,
    };
  },
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
main {
  background-color: #ccc;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h2 {
  color: #fff;
}
.container {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  background-color: #fff;
  border: 1px #ccc solid;
  border-radius: 10px;
  box-shadow: 0 0 20px 5px #999;
}
</style>
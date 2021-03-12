<template>
  <div class="item-list">
    <ul>
      <Item
        v-for="(item, index) in todos"
        :todo="item"
        :index="index"
        :deleteTodo="deleteTodo"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Item from "./Item.vue";
export default defineComponent({
  name: "List",
  components: {
    Item,
  },
  props: ["todos", "deleteTodo"],
});
</script>

<style scoped>
.item-list {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: start;
}
.item-list ul {
  width: 100%;
  border-radius: 5px;
  border: 1px #ccc solid;
  margin: 20px 0;
  padding: 0;
}
</style>
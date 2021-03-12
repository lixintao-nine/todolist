// 程序的主入口
// 引入createapp函数，创建对应的应用，产生应用的实例对象
import { createApp } from 'vue'
// 引入app组件（所有组件的父级组件）
import App from './App.vue'
// 创建实例对象，调用mount进行挂载，挂载到id为app的元素上
createApp(App).mount('#app')

import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import { createMemoryHistory, createRouter } from 'vue-router'
// 定义路由规则
const routes = [
  {
      path:"/",
      name:"Home",
      component:()=>import("../views/Home.vue"),

  }
]
// 创建一个路由实例
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
//导出路由实例
export default router
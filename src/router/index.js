import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import Login from '../views/Login.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: '/edit',
            component: Edit,
            meta: { requiresAdmin: true }
        },
        {
            path: '/card/:id',
            component: ArticleDetail,
            meta: { requiresAuth: true }
        }
    ]
})

// 改进的路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')
    
    // 如果是访问登录页面
    if (to.path === '/login') {
        if (token && userRole) {
            next('/')
        } else {
            next()
        }
        return
    }
    
    // 检查是否需要认证
    if (to.meta.requiresAuth) {
        if (!token || !userRole) {
            ElMessage.warning('请先登录')
            next('/login')
            return
        }
    }
    
    // 检查管理员权限
    if (to.meta.requiresAdmin) {
        if (userRole !== 'admin' || !token) {
            ElMessage.error('需要管理员权限')
            next('/')
            return
        }
    }
    
    next()
})

export default router
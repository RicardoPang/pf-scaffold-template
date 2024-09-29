import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 路由映射 path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
// 参数: to(跳转到的位置) from(从哪里来) next(下一个钩子函数)
// 返回值: 返回值决定导航的路径(不返回或者返回understand, 默认跳转到)
// 例子: / => main
// to: /main from: / 返回值: /abc
router.beforeEach((to) => {
  // 登录成功才能进入首页
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果是进入到了main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router

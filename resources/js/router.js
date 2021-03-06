import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from './pages/errors/NotFound.vue'

import Test from './pages/test.vue'
import ModalTest from './pages/modalTest.vue'
import PostsList from './pages/posts/index.vue'
import PostsDetail from './pages/posts/detail.vue'
import Login from './pages/Login.vue'
import UploadTest from './pages/uploader/uploadTest.vue'
import SelfReflection from './pages/self/SelfReflection.vue'
import Puyopuyo from './pages/puyopuyo/puyopuyo.vue'
import BlackJack from './pages/blackJack/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Test,
  },
  {
    path: '/modal_test',
    component: ModalTest,
  },
  {
    path: '/posts',
    component: PostsList,
  },
  {
    path: '/posts/:id',
    component: PostsDetail,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/upload_test',
    component: UploadTest,
  },
  {
    path: '/self_reflection',
    component: SelfReflection,
  },
  {
    path: '/puyopuyo',
    component: Puyopuyo,
  },
  {
    path: '/blackjack',
    component: BlackJack,
  },
  // 404
  {
    path: '/notFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})

export default router

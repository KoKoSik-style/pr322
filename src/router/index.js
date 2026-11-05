import { createRouter, createWebHistory } from 'vue-router'

// Импорт страниц (создадим их на следующем шаге)
import CoursesListPage from '../pages/CoursesListPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import CourseDescriptionPage from '../pages/CourseDescriptionPage.vue'
import CourseProgramPage from '../pages/CourseProgramPage.vue'
import CourseReviewsPage from '../pages/CourseReviewsPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  { path: '/', redirect: '/courses' },
  { 
    path: '/courses', 
    name: 'CoursesList', 
    component: CoursesListPage 
  },
  {
    path: '/courses/:id',
    component: CoursePage,
    children: [
      { path: '', redirect: { name: 'CourseDescription' } }, // Редирект на вкладку по умолчанию
      { path: 'description', name: 'CourseDescription', component: CourseDescriptionPage },
      { path: 'program', name: 'CourseProgram', component: CourseProgramPage },
      { path: 'reviews', name: 'CourseReviews', component: CourseReviewsPage }
    ]
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginPage,
    meta: { guestOnly: true } // Только для неавторизованных
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: DashboardPage,
    meta: { requiresAuth: true } // Только для авторизованных
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFoundPage 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Защита маршрутов (Guard)
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken')

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Если нет токена и нужен доступ - на логин, сохраняя куда шли
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && isAuthenticated) {
    // Если авторизован и идет на логин - в кабинет
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
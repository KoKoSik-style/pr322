<template>
  <div class="app-layout">
    <!-- Шапка сайта -->
    <header class="navbar">
      <div class="logo">
        <RouterLink to="/courses">📚 Курсы</RouterLink>
      </div>
      
      <nav class="nav-links">
        <RouterLink to="/courses">Каталог</RouterLink>
        
        <template v-if="isAuth">
          <RouterLink to="/dashboard">Личный кабинет</RouterLink>
          <button @click="handleLogout" class="btn-logout">Выйти</button>
        </template>
        
        <template v-else>
          <RouterLink to="/login" class="btn-login">Войти</RouterLink>
        </template>
      </nav>
    </header>

    <!-- Контент -->
    <main class="main-content">
      <RouterView />
    </main>
    
    <!-- Подвал -->
    <footer class="footer">
      <p>© 2026 Практическая работа Vue Router</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Проверка авторизации
const isAuth = ref(!!localStorage.getItem('authToken'))

// Обновляем статус при смене страниц (например, после логина)
watchEffect(() => {
  isAuth.value = !!localStorage.getItem('authToken')
})

const handleLogout = () => {
  localStorage.removeItem('authToken')
  isAuth.value = false
  router.push('/login')
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f4f7f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}
a { text-decoration: none; color: inherit; }

.app-layout { display: flex; flex-direction: column; min-height: 100vh; }

/* Навигация */
.navbar {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.logo a { font-size: 1.5rem; font-weight: bold; color: #2c3e50; }
.nav-links { display: flex; align-items: center; gap: 1.5rem; }
.nav-links a { font-weight: 500; color: #555; }
.nav-links a:hover, .nav-links a.router-link-active { color: #42b983; }

.btn-login { background: #42b983; color: white !important; padding: 0.5rem 1rem; border-radius: 6px; }
.btn-login:hover { background: #369c6d; }
.btn-logout { background: #ff4757; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }

.main-content { flex: 1; }
.footer { text-align: center; padding: 2rem; color: #888; background: white; margin-top: 2rem; border-top: 1px solid #eee; }
</style>
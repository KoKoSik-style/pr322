<template>
  <div class="dashboard">
    <h1>Личный кабинет</h1>
    <p>Вы успешно авторизованы.</p>
    <button @click="logout">Выйти</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  localStorage.removeItem('authToken')
  router.push('/login')
}
</script>

<style scoped>
.dashboard { text-align: center; padding: 4rem; }
button { margin-top: 2rem; padding: 1rem 2rem; background: #ff4757; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; }
</style>
<template>
  <div class="page">
    <h2>Вход</h2>
    <p v-if="error" style="color: red">{{ error }}</p>
    <form @submit.prevent="login">
      <input v-model="password" type="password" placeholder="Введите пароль (1234)" required />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const password = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()

const login = () => {
  if (password.value === '1234') {
    localStorage.setItem('authToken', 'demo')
    // Редирект на предыдущую страницу или в кабинет
    const redirectPath = route.query.redirect || '/dashboard'
    router.push(redirectPath)
  } else {
    error.value = 'Неверный пароль'
  }
}
</script>
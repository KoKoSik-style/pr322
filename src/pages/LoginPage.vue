<template>
  <div class="login-box">
    <h2>Вход в систему</h2>
    <p style="color: red" v-if="error">{{ error }}</p>
    <form @submit.prevent="login">
      <input v-model="password" type="password" placeholder="Пароль (1234)" required />
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
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } else {
    error.value = 'Неверный пароль!'
  }
}
</script>

<style scoped>
.login-box { max-width: 400px; margin: 4rem auto; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; }
input { width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; }
button { width: 100%; padding: 0.8rem; background: #42b983; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
button:hover { background: #369c6d; }
</style>
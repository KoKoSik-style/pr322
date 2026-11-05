<template>
  <header style="padding: 1rem; background: #f0f0f0; border-bottom: 1px solid #ccc;">
    <RouterLink to="/courses">Каталог курсов</RouterLink> |
    <RouterLink to="/dashboard">Личный кабинет</RouterLink> |
    <RouterLink to="/login">Вход</RouterLink>
  </header>
  
  <main style="padding: 1rem;">
    <RouterView />
  </main>
</template>

<script setup>

</script>
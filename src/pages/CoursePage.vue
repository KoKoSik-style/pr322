<template>
  <div class="page" v-if="course">
    <h1>{{ course.title }}</h1>
    <p><strong>Категория:</strong> {{ course.category }}</p>

    <!-- Вкладки -->
    <div class="tabs">
      <RouterLink :to="`/courses/${course.id}/description`" active-class="active">Описание</RouterLink>
      <RouterLink :to="`/courses/${course.id}/program`" active-class="active">Программа</RouterLink>
      <RouterLink :to="`/courses/${course.id}/reviews`" active-class="active">Отзывы</RouterLink>
    </div>

    <!-- Дочерний контент -->
    <div class="tab-content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :course="course" />
      </RouterView>
    </div>
  </div>

  <div v-else class="not-found">
    <h2>Курс не найден</h2>
    <RouterLink to="/courses">Назад к списку</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const course = computed(() => {
  return courses.find(c => c.id === Number(route.params.id))
})
</script>

<style scoped>
.tabs { margin: 1rem 0; display: flex; gap: 1rem; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem; }
.tabs a { text-decoration: none; color: #333; padding: 5px 10px; }
.tabs a.active { background: #42b983; color: white; border-radius: 4px; }
.tab-content { padding: 1rem 0; }
</style>
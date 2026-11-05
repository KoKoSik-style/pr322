<template>
  <div v-if="course" class="course-page">
    <h1>{{ course.title }}</h1>
    <div class="tabs">
      <RouterLink :to="`/courses/${course.id}/description`">Описание</RouterLink>
      <RouterLink :to="`/courses/${course.id}/program`">Программа</RouterLink>
      <RouterLink :to="`/courses/${course.id}/reviews`">Отзывы</RouterLink>
    </div>
    <div class="tab-content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :course="course" />
      </RouterView>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Курс не найден</h2>
    <RouterLink to="/courses">← Назад к списку</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { courses } from '../data/courses'
const route = useRoute()
const course = computed(() => courses.find(c => c.id === Number(route.params.id)))
</script>

<style scoped>
.course-page { max-width: 800px; margin: 0 auto; padding: 2rem; background: white; border-radius: 12px; margin-top: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
.tabs { display: flex; gap: 1rem; border-bottom: 2px solid #eee; margin: 1.5rem 0; }
.tabs a { padding: 0.5rem 1rem; text-decoration: none; color: #666; font-weight: bold; }
.tabs a.router-link-active { color: #42b983; border-bottom: 2px solid #42b983; margin-bottom: -2px; }
.tab-content { padding: 1rem 0; }
.not-found { text-align: center; padding: 4rem; }
</style>
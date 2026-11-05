<template>
  <div v-if="course">
    <h1>{{ course.title }}</h1>
    
    <nav style="margin-bottom: 1rem; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem;">
      <RouterLink :to="`/courses/${course.id}/description`" style="margin-right: 1rem;">Описание</RouterLink>
      <RouterLink :to="`/courses/${course.id}/program`" style="margin-right: 1rem;">Программа</RouterLink>
      <RouterLink :to="`/courses/${course.id}/reviews`">Отзывы</RouterLink>
    </nav>

    <RouterView v-slot="{ Component }">
      <component :is="Component" :course="course" />
    </RouterView>
  </div>
  <div v-else>
    <h2>Курс не найден</h2>
    <RouterLink to="/courses">Назад к списку</RouterLink>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const course = computed(() => {
  return courses.find(c => c.id === Number(route.params.id))
})

// Также передаем через provide на случай использования inject в дочерних
provide('course', course)
</script>
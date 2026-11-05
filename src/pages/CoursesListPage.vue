<template>
  <div>
    <h1>Каталог курсов</h1>
    
    <div style="margin-bottom: 1rem;">
      <button @click="setFilter('all')">Все</button>
      <button @click="setFilter('frontend')">Frontend</button>
      <button @click="setFilter('backend')">Backend</button>
    </div>

    <div v-if="loading">Загрузка...</div>

    <div v-else>
      <div v-for="course in filteredCourses" :key="course.id" style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;">
        <h3>{{ course.title }}</h3>
        <p>Категория: {{ course.category }}</p>
        <RouterLink :to="`/courses/${course.id}`">Подробнее</RouterLink>
      </div>
      <p v-if="filteredCourses.length === 0">Курсы не найдены</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const router = useRouter()
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000) // Задержка 1000 мс (в диапазоне 800-1200)
})

const currentCategory = computed(() => route.query.category || 'all')

const filteredCourses = computed(() => {
  if (currentCategory.value === 'all') return courses
  return courses.filter(c => c.category === currentCategory.value)
})

const setFilter = (category) => {
  router.push({ path: '/courses', query: category === 'all' ? {} : { category } })
}
</script>
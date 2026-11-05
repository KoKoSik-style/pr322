<template>
  <div class="page">
    <h1>Каталог курсов</h1>
    
    <!-- Фильтры -->
    <div class="filters">
      <button @click="setFilter('all')" :class="{ active: currentCategory === 'all' }">Все</button>
      <button @click="setFilter('frontend')" :class="{ active: currentCategory === 'frontend' }">Frontend</button>
      <button @click="setFilter('backend')" :class="{ active: currentCategory === 'backend' }">Backend</button>
    </div>

    <!-- Спиннер -->
    <div v-if="loading" class="spinner">Загрузка...</div>

    <!-- Список -->
    <div v-else class="courses-grid">
      <div v-for="course in filteredCourses" :key="course.id" class="course-card">
        <h3>{{ course.title }}</h3>
        <p class="category">{{ course.category }}</p>
        <RouterLink :to="`/courses/${course.id}`" class="btn">Подробнее</RouterLink>
      </div>
      <p v-if="filteredCourses.length === 0">Курсы не найдены.</p>
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
const currentCategory = computed(() => route.query.category || 'all')

// Имитация загрузки
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

// Фильтрация
const filteredCourses = computed(() => {
  if (currentCategory.value === 'all') return courses
  return courses.filter(c => c.category === currentCategory.value)
})

// Смена фильтра через URL
const setFilter = (category) => {
  router.push({ path: '/courses', query: category === 'all' ? {} : { category } })
}
</script>

<style scoped>
.filters button { margin-right: 10px; padding: 5px 15px; cursor: pointer; }
.filters button.active { background: #42b983; color: white; border: none; }
.spinner { text-align: center; margin: 2rem; font-size: 1.2rem; }
.courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem; }
.course-card { border: 1px solid #ccc; padding: 1rem; border-radius: 8px; }
.category { color: #666; font-size: 0.9em; }
.btn { display: inline-block; margin-top: 10px; background: #42b983; color: white; padding: 5px 10px; text-decoration: none; border-radius: 4px; }
</style>
<template>
  <div class="courses-page">
    <h1>Каталог курсов</h1>
    
    <!-- Фильтры -->
    <div class="filters">
      <button @click="setFilter('all')" :class="['filter-btn', { active: currentCategory === 'all' }]">Все</button>
      <button @click="setFilter('frontend')" :class="['filter-btn', { active: currentCategory === 'frontend' }]">Frontend</button>
      <button @click="setFilter('backend')" :class="['filter-btn', { active: currentCategory === 'backend' }]">Backend</button>
    </div>

    <!-- Спиннер -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка...</p>
    </div>

    <!-- Сетка -->
    <div v-else class="courses-grid">
      <div v-for="course in filteredCourses" :key="course.id" class="course-card">
        <span class="badge" :class="course.category">{{ course.category }}</span>
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <RouterLink :to="`/courses/${course.id}`" class="btn-more">Подробнее →</RouterLink>
      </div>
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

onMounted(() => {
  setTimeout(() => { loading.value = false }, 800)
})

const filteredCourses = computed(() => {
  if (currentCategory.value === 'all') return courses
  return courses.filter(c => c.category === currentCategory.value)
})

const setFilter = (category) => {
  router.push({ path: '/courses', query: category === 'all' ? {} : { category } })
}
</script>

<style scoped>
.courses-page { max-width: 1200px; margin: 0 auto; padding: 2rem; }
h1 { text-align: center; color: #2c3e50; }
.filters { display: flex; justify-content: center; gap: 1rem; margin: 2rem 0; }
.filter-btn { padding: 0.6rem 1.5rem; border: 2px solid #42b983; background: transparent; color: #42b983; border-radius: 30px; cursor: pointer; font-weight: bold; transition: 0.3s; }
.filter-btn.active, .filter-btn:hover { background: #42b983; color: white; }
.courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
.course-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; border: 1px solid #eee; }
.badge { display: inline-block; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase; margin-bottom: 1rem; align-self: flex-start; }
.badge.frontend { background: #e0f2fe; color: #0284c7; }
.badge.backend { background: #fce7f3; color: #db2777; }
.course-card h3 { margin: 0 0 1rem; color: #2c3e50; }
.course-card p { color: #666; line-height: 1.5; flex-grow: 1; }
.btn-more { display: inline-block; text-align: center; background: #42b983; color: white; padding: 0.8rem; border-radius: 8px; font-weight: bold; margin-top: 1rem; }
.btn-more:hover { background: #369c6d; }
.loading-container { display: flex; flex-direction: column; align-items: center; padding: 4rem; }
.spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #42b983; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>
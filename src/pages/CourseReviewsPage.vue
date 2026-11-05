<template>
  <div>
    <h3>Отзывы</h3>
    <div v-for="(review, index) in course.reviews" :key="index" class="review">
      <p><strong>{{ review.author }}</strong> (Оценка: {{ review.rating }})</p>
      <p>{{ review.text }}</p>
    </div>
    <p v-if="course.reviews.length === 0">Отзывов пока нет.</p>
  </div>
</template>

<script setup>
defineProps({ course: Object })
</script>

<style scoped>
.review { border-bottom: 1px solid #eee; padding-bottom: 1rem; margin-bottom: 1rem; }
</style>
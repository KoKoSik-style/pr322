<template>
  <div>
    <h3>Отзывы</h3>
    <div v-for="(review, index) in course.reviews" :key="index" style="border-bottom: 1px solid #eee; margin-bottom: 1rem; padding-bottom: 0.5rem;">
      <p><strong>{{ review.author }}</strong> (Оценка: {{ review.rating }})</p>
      <p>{{ review.text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ course: Object })
</script>
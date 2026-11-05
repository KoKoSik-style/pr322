<template>
  <div>
    <h3>Отзывы</h3>
    <div v-for="(r, i) in course.reviews" :key="i" class="review">
      <p><strong>{{ r.author }}</strong> — Оценка: {{ r.rating }}</p>
      <p>{{ r.text }}</p>
    </div>
  </div>
</template>
<script setup>defineProps({ course: Object })</script>
<style scoped>.review { border-bottom: 1px solid #eee; padding-bottom: 1rem; margin-bottom: 1rem; }</style>
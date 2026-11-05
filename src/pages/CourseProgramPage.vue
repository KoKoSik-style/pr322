<template>
  <div>
    <h3>Программа</h3>
    <ol>
      <li v-for="(item, index) in course.program" :key="index">{{ item }}</li>
    </ol>
  </div>
</template>

<script setup>
defineProps({ course: Object })
</script>
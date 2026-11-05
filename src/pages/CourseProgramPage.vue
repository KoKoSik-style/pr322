<template>
  <div>
    <h3>Программа</h3>
    <ol><li v-for="(item, i) in course.program" :key="i">{{ item }}</li></ol>
  </div>
</template>
<script setup>defineProps({ course: Object })</script>
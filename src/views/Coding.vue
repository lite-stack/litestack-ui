<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <p>Count: {{ counter.count }}</p>
  <p>Double Count: {{ counter.doubleCount }}</p>
  <button @click="counter.increment()">Increment</button>
</template>

<style scoped>

</style>